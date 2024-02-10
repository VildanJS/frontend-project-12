import { Overlay } from '@/shared/ui/Overlay'
import React, { FC } from 'react'
import { Modal, ModalProps } from '@/shared/ui/Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from '@/shared/ui/Button'
import { useRenameChannelMutation } from '@/features/channel/RenameChannel/api'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { getChannelNamesList } from '@/entities/Channel/model/channelsSlice'
import { toast } from 'react-toastify'
import { isApiResponse } from '@/shared/utils/isApiError'
import { getLeoProfanityFilter } from '@/shared/leoProfanity'

interface RenameChannelModalProps extends ModalProps {
    channelId: number,
    channelName: string
}

const validationSchema = (t: TFunction<'translation', undefined>, channelsNames: string[]) => {
    return Yup.object().shape({
        name: Yup.string()
            .required(t('modals.rename.validation.required'))
            .min(3, t('modals.rename.validation.min3'))
            .max(20, t('modals.rename.validation.max20'))
            .notOneOf(channelsNames, t('modals.rename.validation.notUniqueName')),
    })
}


export const RenameChannelModal: FC<RenameChannelModalProps> = (props) => {
    const { t } = useTranslation()
    const filter = getLeoProfanityFilter('ru')
    const { channelId, channelName, onClose } = props
    const [renameChannel] = useRenameChannelMutation()

    const channelNamesList = useSelector(getChannelNamesList)

    const schema = validationSchema(t, channelNamesList)

    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={t('modals.rename.title')}
                onClose={props.onClose}
                isOpen={props.isOpen}
            >
                <Formik
                    initialValues={{
                        name: channelName,
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, formikHelpers) => {
                        try {
                            await renameChannel({ name: filter.clean(values.name), id: channelId }).unwrap()
                            toast.success(t('modals.rename.renameChannelSuccess'))
                            formikHelpers.resetForm()
                            onClose()
                        } catch (error) {
                            if (isApiResponse(error)) {
                                toast.error(t('modals.rename.renameChannelError'))
                            } else {
                                console.error(error)
                            }
                        }
                    }}
                >
                    <Form className=''>
                        <div>
                            <Field
                                autoFocus={true}
                                id='nameId'
                                name='name'
                                type='text'
                                className='mb-2 form-control'
                            />
                            <label
                                className='visually-hidden'
                                htmlFor='nameId'
                            >{t('modals.rename.name')}
                            </label>
                            <ErrorMessage name='name' component='label' />
                            <div className='d-flex justify-content-end'>
                                <Button
                                    onClick={() => onClose()}
                                    type='button'
                                    className='me-2 btn btn-secondary'
                                >{t('modals.rename.cancel')}
                                </Button>
                                <Button
                                    type='submit'
                                    className='btn btn-primary'
                                >{t('modals.rename.send')}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}
