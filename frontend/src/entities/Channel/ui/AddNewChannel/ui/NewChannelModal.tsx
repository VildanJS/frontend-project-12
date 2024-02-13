import { Overlay } from '@/shared/ui/Overlay'
import React, { type FC } from 'react'
import { Modal, type ModalProps } from '@/shared/ui/Modal'

import { NewChannelForm } from './NewChannelForm'


interface NewChannelModalProps extends ModalProps {
}


export const NewChannelModal: FC<NewChannelModalProps> = (props) => {
    const { onClose, isOpen } = props

    return (
        <>
            <Overlay isOpen={props.isOpen} />
            <Modal
                header={'Новый канал'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <NewChannelForm onClose={onClose} />
            </Modal>
        </>
    )
}
