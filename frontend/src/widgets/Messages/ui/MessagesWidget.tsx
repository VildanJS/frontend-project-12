import { MessageForm, MessageList } from '@/entities/Message'
import React from 'react'

export const MessagesWidget = () => {
    return (
        <>
            <MessageList />
            <MessageForm />
        </>
    )
}
