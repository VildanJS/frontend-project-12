import { FC } from 'react'
import { Dropdown } from '@/shared/ui/Dropdown'
import { RemoveChannel } from '@/features/channel/RemoveChannel'
import { RenameChannel } from '@/features/channel/RenameChannel'
import { ChannelType, getCurrentChannelId } from '@/entities/Channel'
import { useSelector } from 'react-redux'
import classNames from 'classnames'


export const ChannelDropdown: FC<ChannelType> = (props) => {
    const { id } = props
    const currenChannelId = useSelector(getCurrentChannelId)

    const dropdownClassname = classNames(
        { ['btn-secondary']: id === currenChannelId },
    )


    return (
        <Dropdown btnClassName={dropdownClassname} name='Управление каналом'>
            <RemoveChannel {...props} />
            <RenameChannel {...props} />
        </Dropdown>
    )
}
