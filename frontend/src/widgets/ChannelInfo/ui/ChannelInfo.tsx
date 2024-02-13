import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectChannelById, selectCurrentChannelId } from '@/entities/Channel'
import { selectMessagesCountByChannelId } from '@/entities/Message'

export const ChannelInfo = () => {
    const { t } = useTranslation()
    const currentChannelId = useSelector(selectCurrentChannelId)
    const messagesCountByChannelId = useSelector(state => selectMessagesCountByChannelId(state, currentChannelId))

    const currentChannel = useSelector(state => selectChannelById(state, currentChannelId))

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
