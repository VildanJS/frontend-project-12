import { useSelector } from 'react-redux'
import { getMessagesCountByChannelId } from '@/entities/Message/model/messagesSlice'
import { channelsSelector, getCurrentChannelId } from '@/entities/Channel'
import { type StateSchema } from '@/app/provider/store'
import { useTranslation } from 'react-i18next'

export const ChannelInfo = () => {
    const {t} = useTranslation()
    const currentChannelId = useSelector(getCurrentChannelId)
    const messagesCountByChannelId = useSelector(getMessagesCountByChannelId(currentChannelId))
    const currentChannel = useSelector((state: StateSchema) => channelsSelector.selectById(state, currentChannelId))

    return (
        <div className='bg-light mb-4 p-3 shadow-sm small'>
            <p className='m-0'>
                <b># {currentChannel?.name}</b>
            </p>
            <span className='text-muted'>
                {`${t('messages.messages', { count: messagesCountByChannelId })}`}
            </span>
        </div>
    )
}
