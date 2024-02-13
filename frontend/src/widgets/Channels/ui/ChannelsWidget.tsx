import React from 'react'
import { useTranslation } from 'react-i18next'
import { AddNewChannel, ChannelList } from '@/entities/Channel'

export const ChannelsWidget = () => {
    const { t } = useTranslation()
    return (
        <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
            <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                <b>{t("channels.channels")}</b>
                <AddNewChannel />
            </div>
            <ChannelList />
        </div>
    )
}
