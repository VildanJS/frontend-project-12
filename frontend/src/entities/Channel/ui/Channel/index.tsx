import { Button } from '@/shared/ui/Button'
import { PropsWithChildren } from 'react'
import { ChannelType, getCurrentChannelId, setCurrentChannelId } from '@/entities/Channel'
import classNames from 'classnames'
import { useAppDispatch } from '@/shared/hooks'
import { useSelector } from 'react-redux'

interface ChannelComponentProps extends PropsWithChildren<ChannelType> {
}

export const Channel = (props: ChannelComponentProps) => {
    const { id } = props
    const currenChannelId = useSelector(getCurrentChannelId)

    const channelClassName = classNames(['w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn'], {
        ['btn-secondary']: currenChannelId === id,
    })

    const dispatch = useAppDispatch()


    return (
        <Button type="button" onClick={() => dispatch(setCurrentChannelId({ id }))} className={channelClassName}>
            <span className='me-1'>#</span>
            {props.name}
        </Button>
    )

}
