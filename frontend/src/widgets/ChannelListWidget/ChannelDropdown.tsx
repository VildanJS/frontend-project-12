import { type FC } from 'react'
import { Dropdown } from '@/shared/ui/Dropdown'
import { RemoveChannel } from '@/features/channel/RemoveChannel'
import { RenameChannel } from '@/features/channel/RenameChannel'
import { type ChannelType, getCurrentChannelId } from '@/entities/Channel'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'


export const ChannelDropdown: FC<ChannelType> = (props) => {
    const { t } = useTranslation()
    const { id } = props
    const currenChannelId = useSelector(getCurrentChannelId)

    const dropdownClassname = classNames(
        { 'btn-secondary': id === currenChannelId },
    )


    return (
        <Dropdown btnClassName={dropdownClassname} name={t('channel.manage')}>
            <RemoveChannel {...props} />
            <RenameChannel {...props} />
        </Dropdown>
    )
}
