import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChannelList } from '@/widgets/ChannelListWidget'
import { ChannelInfo } from '@/widgets/ChannelInfo'
import { AddNewChannel } from '@/features/channel/AddNewChannel/'
import { MessageForm, MessageList } from '@/entities/Message'

import {
    useGetChannelsAndMessagesQuery,
} from '@/shared/api/rtkApi'


export const MainPage = () => {

    const {data} = useGetChannelsAndMessagesQuery()
    console.log("=>(MainPage.tsx:24) data", data);

    const { t } = useTranslation()


    return (
        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>
                <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>{t("channels.channels")}</b>
                        <AddNewChannel />
                    </div>
                    <ChannelList channels={data?.channels} />
                </div>
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <ChannelInfo />
                        <MessageList messages={data?.messages} />
                        <MessageForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
