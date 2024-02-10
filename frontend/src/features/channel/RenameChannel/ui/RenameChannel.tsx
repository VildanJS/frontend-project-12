import React from 'react'
import { useModalState } from '@/shared/ui/Modal'
import { Portal } from '@/shared/ui/Portal'
import { AppLink } from '@/shared/ui/Link'
import { type ChannelType } from '@/entities/Channel'
import { RenameChannelModal } from './RenameChannelModal'
import { useTranslation } from 'react-i18next'

interface RenameChannelProps extends ChannelType {

}

export const RenameChannel = (props: RenameChannelProps) => {
    const {t} = useTranslation()
    const [isOpen, setModalClose, setModalShow] = useModalState()

    const { id, name } = props
    return (
        <>
            <AppLink
                onClick={setModalShow}
                data-rr-ui-dropdown-item=''
                className='dropdown-item'
                role='button'
            >
                {t('channel.rename')}
            </AppLink>

            {isOpen &&
                <Portal>
                    <RenameChannelModal
                        channelName={name}
                        channelId={id}
                        isOpen={isOpen}
                        onClose={setModalClose}
                    />
                </Portal>
            }
        </>
    )
}
