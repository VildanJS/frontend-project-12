import { type FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Dropdown } from '@/shared/ui/Dropdown'
import { ChannelType } from '../../../api/ChannelApi'
import { selectCurrentChannelId } from '../../../model/currentChannelIdSlice'
import { RemoveChannel } from './RemoveChannel'
import { RenameChannel } from './RenameChannel'


export const ChannelDropdown: FC<ChannelType> = (props) => {
    const { t } = useTranslation()
    const { id } = props
    const currenChannelId = useSelector(selectCurrentChannelId)

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
