import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, type ModalProps } from '@/shared/ui/Modal'
import { Overlay } from '@/shared/ui/Overlay'

import { RenameChannelForm } from './RenameChannelForm'

interface RenameChannelModalProps extends ModalProps {
    channelId: string,
    channelName: string
}



export const RenameChannelModal: FC<RenameChannelModalProps> = (props) => {
    const { t } = useTranslation()
    const { channelId, channelName, onClose } = props

    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={t('modals.rename.title')}
                onClose={props.onClose}
                isOpen={props.isOpen}
            >
                <RenameChannelForm
                    channelId={channelId}
                    channelName={channelName}
                    onClose={onClose}
                />
            </Modal>
        </>
    )
}
