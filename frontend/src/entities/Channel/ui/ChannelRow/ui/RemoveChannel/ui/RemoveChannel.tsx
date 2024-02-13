import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useModalState } from '@/shared/ui/Modal'
import { AppLink } from '@/shared/ui/Link'
import { Portal } from '@/shared/ui/Portal'

import { type ChannelType } from '../../../../../api/ChannelApi'
import { RemoveChannelModal } from './RemoveChannelModal'

interface RenameChannelProps extends ChannelType {
}

export const RemoveChannel: FC<RenameChannelProps> = (props) => {
    const { t } = useTranslation()
    const [isOpen, setModalClose, setModalShow] = useModalState()

    return (
        <>
            <AppLink
                onClick={setModalShow}
                data-rr-ui-dropdown-item=''
                className='dropdown-item'
                role='button'
            >
                {t('channel.remove')}
            </AppLink>

            {isOpen &&
                <Portal>
                    <RemoveChannelModal
                        channelId={props.id}
                        isOpen={isOpen}
                        onClose={setModalClose}
                    />
                </Portal>
            }
        </>
    )
}
