import React, { type FC } from 'react'
import { Overlay } from '@/shared/ui/Overlay'
import { Modal, type ModalProps } from '@/shared/ui/Modal'
import { RemoveChannelForm } from './RemoveChannelForm'


interface RemoveChannelModalProps extends ModalProps {
    channelId: string
}

export const RemoveChannelModal: FC<RemoveChannelModalProps> = (props) => {
    const { channelId, onClose, isOpen, header } = props
    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={header}
                onClose={onClose}
                isOpen={isOpen}
            >
                <RemoveChannelForm onClose={onClose} channelId={channelId} />
            </Modal>
        </>
    )
}
