 import { type FC } from 'react'
import { Channel, type ChannelType } from '@/entities/Channel'
import { ChannelDropdown } from './ChannelDropdown'

interface ChannelItemProps extends ChannelType {

}

export const ChannelItem: FC<ChannelItemProps> = (props) => {

        return (
            <li className='nav-item w-100'>
                {props.removable
                    ?   <div role='group' className='d-flex dropdown btn-group'>
                            <Channel {...props} />
                            <ChannelDropdown {...props} />
                        </div>
                    :   <Channel {...props} />
                }
            </li>
        )
}
