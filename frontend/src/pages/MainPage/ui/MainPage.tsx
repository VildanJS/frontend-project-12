import React from 'react'
import { ChannelInfo } from '@/widgets/ChannelInfo'
import { ChannelsWidget } from '@/widgets/Channels'
import { MessagesWidget } from '@/widgets/Messages'

export const MainPage = () => {
    return (
        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>
                <ChannelsWidget />
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <ChannelInfo />
                        <MessagesWidget />
                    </div>
                </div>
            </div>
        </div>
    )
}
