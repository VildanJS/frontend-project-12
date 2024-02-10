import { getSocket, rtkApi } from '@/shared/api/rtkApi'
import { type StateSchema } from '@/app/provider/store'


export const messageApi = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            sendMessage: builder.mutation<string, string>({
                queryFn: (chatMessageContent: string, api) => {
                    const state = api.getState() as StateSchema

                    const socket = getSocket()
                    return new Promise(resolve => {
                        socket.emit(
                            'newMessage',
                            {
                                body: chatMessageContent,
                                channelId: state.channels.currentChannelId,
                                username: state.auth.username,
                            },
                            (res: { status: string }) => {
                                if (res.status === 'ok') {
                                    resolve(
                                        {
                                            data: chatMessageContent,
                                        },
                                    )
                                }
                            })
                    })
                },
                invalidatesTags: () => ['Message'],
            })
        }),
    },
)

export const {
    useSendMessageMutation,
} = messageApi
