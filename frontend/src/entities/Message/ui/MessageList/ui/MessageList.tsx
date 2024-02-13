import { useEffect, useMemo, useRef } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectCurrentChannelId } from '@/entities/Channel'
import { MessageText } from '../../MessageText/ui/MessageText'
import { MessageType, useGetMessagesQuery } from '../../../api/MessageApi'

export const MessageList = () => {

    const currentChannelId = useSelector(selectCurrentChannelId)

    const selectMessagesByChannelId = useMemo(() => {
        const emptyArray: MessageType[] = []
        return createSelector(
            (res) => res.data,
            (res, channelId) => channelId,
            (data, channelId) => data?.filter((message: MessageType) => message.channelId === channelId) ?? emptyArray,
        )
    }, [])

    const { messagesByCurrentChannel } = useGetMessagesQuery(undefined, {
        selectFromResult: result => ({
            messagesByCurrentChannel: selectMessagesByChannelId(result, currentChannelId),
        }),
    })


    const ref = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messagesByCurrentChannel])

    return (
        <div id='messages-box' className='chat-messages overflow-auto px-5 '>
            {messagesByCurrentChannel.map(
                (message: MessageType) => {
                    return (
                        <MessageText body={message.body} key={message.id} username={message.username} />
                    )
                },
            )}
            <div style={{ float: 'left', clear: 'both' }}
                 ref={ref}>
            </div>
        </div>
    )
}

