import { useSelector } from 'react-redux'
import { type PropsWithChildren } from 'react'
import classNames from 'classnames'

import { Button } from '@/shared/ui/Button'
import { useAppDispatch } from '@/shared/hooks'

import { selectCurrentChannelId, setCurrentChannelId } from '../../../model/currentChannelIdSlice'
import { ChannelType } from '../../../api/ChannelApi'


interface ChannelComponentProps extends PropsWithChildren<ChannelType> {
}

export const ChannelItem = (props: ChannelComponentProps) => {
    const { id } = props
    const currentChannelId = useSelector(selectCurrentChannelId)

    const channelClassName = classNames(['w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn'], {
        'btn-secondary': currentChannelId === id,
    })

    const dispatch = useAppDispatch()

    return (
        <Button type="button" onClick={() => dispatch(setCurrentChannelId({ id }))} className={channelClassName}>
            <span className='me-1'>#</span>
            {props.name}
        </Button>
    )

}
