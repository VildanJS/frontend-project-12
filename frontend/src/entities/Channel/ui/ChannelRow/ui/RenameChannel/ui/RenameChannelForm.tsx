import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { TFunction } from 'i18next'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { isApiError } from '@/shared/utils/isApiError'
import { Button } from '@/shared/ui/Button'
import { getLeoProfanityFilter } from '@/shared/leoProfanity'

import { selectAllChannelsNames, useEditChannelMutation } from '../../../../../api/ChannelApi'


interface RenameChannelFormProps {
    channelId: string,
    channelName: string,
    onClose: () => void
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
export const RenameChannelForm: FC<RenameChannelFormProps> = (props) => {
    const { t } = useTranslation()
    const filter = getLeoProfanityFilter('en')
    const { channelId, channelName, onClose } = props
    const channelNamesList = useSelector(selectAllChannelsNames)
    const schema = validationSchema(t, channelNamesList)
    const [editChannel] = useEditChannelMutation()
    return (
        <Formik
            initialValues={{
                name: channelName,
            }}
            validationSchema={schema}
            onSubmit={async (values, formikHelpers) => {
                try {
                    await editChannel({ name: filter.clean(values.name), id: channelId }).unwrap()
                    toast.success(t('modals.rename.renameChannelSuccess'))
                    formikHelpers.resetForm()
                    onClose()
                } catch (error) {
                    if (isApiError(error)) {
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
                            onClick={() => { onClose(); }}
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
    )
}
