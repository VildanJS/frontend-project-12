import { ChannelType } from '@/entities/Channel'
import { ChannelItem } from './ChannelItem'

interface ChannelListProps {
    channels: ChannelType[]
}

export const ChannelList = (props: ChannelListProps) => {

    return (
        <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
            {props.channels.map((channel) => {
                return (
                    <ChannelItem {...channel} key={channel.id} />
                )
            })}
        </ul>
    )
}