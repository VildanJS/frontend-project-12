import { FC } from 'react'
import { useGetChannelsQuery } from '../../../api/ChannelApi'
import { ChannelRow } from '../../ChannelRow'

interface ChannelListProps {}

export const ChannelList: FC<ChannelListProps> = () => {
    const { data: channels } = useGetChannelsQuery()
    return (
        <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
            {channels?.map((channel) => {
                return (
                    <ChannelRow {...channel} key={channel.id} />
                )
            })}
        </ul>
    )
}
