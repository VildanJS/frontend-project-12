import React, { FC } from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useDeleteChannelMutation } from '../../../../../api/ChannelApi'
import { Button } from '@/shared/ui/Button'


interface RemoveChannelFormProps {
    channelId: string,
    onClose: () => void
}

export const RemoveChannelForm: FC<RemoveChannelFormProps> = (props) => {
    const { channelId, onClose} = props
    const { t } = useTranslation()
    const [deleteChannel] = useDeleteChannelMutation()

    return (
        <Formik
            initialValues={{}}
            onSubmit={(values, formikHelpers) => {
                try {
                    deleteChannel({ id: channelId })
                    toast.success(t('modals.remove.removeChannelSuccess'))
                    formikHelpers.resetForm()
                    onClose()
                } catch (e) {
                    toast.error(t('modals.remove.removeChannelError'))
                }
            }}
        >
            <Form className=''>
                <div>
                    <p className='lead'>{t('modals.remove.subtitle')}</p>
                    <div className='d-flex justify-content-end'>
                        <Button
                            type='button'
                            onClick={() => { onClose(); }}
                            className='me-2 btn btn-secondary'
                        >{t('modals.remove.cancel')}
                        </Button>
                        <Button type='submit'
                                className='btn btn-danger'
                        >{t('modals.remove.remove')}</Button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}
