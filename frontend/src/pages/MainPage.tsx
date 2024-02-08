import {
    rtkApi,
} from '@/shared/api/rtkApi'


import { ChannelList } from '@/widgets/ChannelListWidget'
import { MessageForm, MessageList } from '@/entities/Message'


import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'
import { getMessagesByChannelId } from '@/entities/Message/'
import { channelsSelector, getCurrentChannelId } from '@/entities/Channel/'
import { AddNewChannel } from '@/features/channel/AddNewChannel/ui/AddNewChannel'
import React from 'react'
import { ChannelInfo } from '@/widgets/ChannelInfo'
import { useAppDispatch } from '@/shared/hooks'

export const MainPage = () => {
    const dispatch = useAppDispatch()
    dispatch(rtkApi.endpoints.getChannelsAndMessages.initiate())


    const { t } = useTranslation()


    const currentChannelId = useSelector(getCurrentChannelId)
    const messagesByCurrentChannelId = useSelector(getMessagesByChannelId(currentChannelId))

    const channels = useSelector(channelsSelector.selectAll)


    return (
        <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>
                <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>{t("channels.channels")}</b>
                        <AddNewChannel />
                    </div>
                    <ChannelList channels={channels} />
                </div>
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <ChannelInfo />
                        <MessageList messages={messagesByCurrentChannelId} />
                        <MessageForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
