import { type PropsWithChildren, useEffect, useRef } from 'react'
import { type MessageType } from '../../model/messagesSlice'
import { MessageText } from '../MessageText/MessageText'
import { useSelector } from 'react-redux'
import { getCurrentChannelId } from '@/entities/Channel'

interface MessageListProps extends PropsWithChildren {
    messages?: MessageType[]
}

export const MessageList = ({messages = []}: MessageListProps) => {

    const currentChannelId = useSelector(getCurrentChannelId)

    const messagesByCurrentChannel = messages.filter((message) => message.channelId === currentChannelId)

    const ref = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messagesByCurrentChannel])

    return (
        <div id='messages-box' className='chat-messages overflow-auto px-5 '>
            {messagesByCurrentChannel.map(
                (message) => {
                    return (
                        <MessageText body={message.body} key={message.id} username={message.username} />
                    )
                },
            )}
            <div style={{ float:"left", clear: "both" }}
                 ref={ref}>
            </div>
        </div>
    )
}
