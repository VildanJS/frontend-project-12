import { Overlay } from '@/shared/ui/Overlay'
import React, { type FC } from 'react'
import { Modal, type ModalProps } from '@/shared/ui/Modal'
import { Form, Formik } from 'formik'
import { Button } from '@/shared/ui/Button'
import { useRemoveChannelMutation } from '@/features/channel/RemoveChannel/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


interface RemoveChannelModalProps extends ModalProps {
    channelId: number,
    channelName?: string
}

export const RemoveChannelModal: FC<RemoveChannelModalProps> = (props) => {
    const { channelId, channelName, onClose } = props
    const { t } = useTranslation()

    const [removeChannel] = useRemoveChannelMutation()

    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={t('modals.remove.title')}
                onClose={props.onClose}
                isOpen={props.isOpen}
            >
                <Formik
                    initialValues={{
                        name: channelName,
                    }}
                    onSubmit={(values, formikHelpers) => {
                        try {
                            removeChannel({ id: channelId })
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
            </Modal>
        </>
    )
}
