import { Text } from '@/shared/ui/Text'

export interface MessageTextProps {
    body: string,
    username: string
}

export const MessageText = (props: MessageTextProps) => {
    return (
        <Text {...props} />
    )
}
