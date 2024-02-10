import { Overlay } from '@/shared/ui/Overlay'
import * as Yup from 'yup'
import React, { FC } from 'react'
import { Modal } from '@/shared/ui/Modal'
import { ModalProps } from '@/shared/ui/Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from '@/shared/ui/Button'
import { useAddNewChannelMutation } from '@/features/channel/AddNewChannel'
import { useTranslation } from 'react-i18next'
import { getLeoProfanityFilter } from '@/shared/leoProfanity'
import { toast } from 'react-toastify'
import { isApiResponse } from '@/shared/utils/isApiError'
import { TFunction } from 'i18next'
import { useSelector } from 'react-redux'
import { getChannelNamesList } from '@/entities/Channel/model/channelsSlice'


interface NewChannelModalProps extends ModalProps {

}

const validationSchema = (t: TFunction<'translation', undefined>, channelsNames: string[]) => {
    return Yup.object().shape({
        name: Yup.string()
            .required(t('modals.add.validation.required'))
            .min(3, t('modals.add.validation.min3'))
            .max(20, t('modals.add.validation.max20'))
            .notOneOf(channelsNames, t('modals.add.validation.notUniqueName')),
    })
}

export const NewChannelModal: FC<NewChannelModalProps> = (props) => {
    const { onClose, isOpen } = props
    const filter = getLeoProfanityFilter('en')
    const [createNewChannel] = useAddNewChannelMutation()

    const { t } = useTranslation()

    const channelNamesList = useSelector(getChannelNamesList)

    const schema = validationSchema(t, channelNamesList)

    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={'Новый канал'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            await createNewChannel({ name: filter.clean(values.name) }).unwrap()
                            toast.success(t('modals.add.addChannelSuccess'))
                            resetForm()
                            onClose()
                        } catch (error) {
                            if (isApiResponse(error)) {
                                toast.error(t('modals.add.addChannelError'))
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
                                id='name'
                                name='name'
                                type='text'
                                className='mb-2 form-control'
                            />
                            <ErrorMessage name='name' component='label' />
                            <label
                                className='visually-hidden'
                                htmlFor='name'
                            >{t('modals.add.name')}
                            </label>
                            <div className='d-flex justify-content-end'>
                                <Button
                                    onClick={() => onClose()}
                                    type='button'
                                    className='me-2 btn btn-secondary'
                                >
                                    {t('modals.add.cancel')}
                                </Button>
                                <Button
                                    type='submit'
                                    className='btn btn-primary'
                                >
                                    {t('modals.add.add')}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}
