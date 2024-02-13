import { FC } from 'react'
import { ChannelType } from '../../../api/ChannelApi'
import { ChannelDropdown } from './ChannelDropdown'
import { ChannelItem } from './ChannelItem'


interface ChannelItemProps extends ChannelType {}

export const ChannelRow: FC<ChannelItemProps> = (props) => {
    return (
        <li className='nav-item w-100'>
            {props.removable
                ? <div role='group' className='d-flex dropdown btn-group'>
                    <ChannelItem {...props} />
                    <ChannelDropdown {...props} />
                </div>
                : <ChannelItem {...props} />
            }
        </li>
    )
}
