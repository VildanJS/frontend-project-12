import { FC, PropsWithChildren } from 'react'

interface TextProps extends PropsWithChildren {
    body: string,
    username: string
}

export const Text: FC<TextProps> = (props) => {
    const { body, username } = props
    return (
        <div className='text-break mb-2'><b>{username}</b>: {body}</div>
    )
}
