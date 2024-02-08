import { PropsWithChildren, useEffect, useRef } from 'react'
import { MessageType } from '../../model/messagesSlice'
import { MessageText } from '../MessageText/MessageText'

interface MessageListProps extends PropsWithChildren {
    messages: MessageType[]
}

export const MessageList = (props: MessageListProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [props.messages])

    return (
        <div id='messages-box' className='chat-messages overflow-auto px-5 '>
            {props.messages.map(
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
