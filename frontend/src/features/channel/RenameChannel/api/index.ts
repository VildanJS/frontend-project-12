import { getSocket, rtkApi } from '@/shared/api/rtkApi'

export const channelApiRename = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            renameChannel: builder.mutation({
                queryFn: ({name, id}) => {
                    return new Promise(resolve => {
                        const socket = getSocket()
                        socket.emit(
                            'renameChannel',
                            {
                                id,
                                name
                            },
                            (res: { status: string }) => {
                                if (res.status === 'ok') {
                                    resolve(
                                        {
                                            data: {
                                                id,
                                                name
                                            },
                                        },
                                    )
                                }
                            })
                    })
                },
                invalidatesTags: () => ['Channel'],
            }),
        }),
    },
)

export const {
    useRenameChannelMutation,
} = channelApiRename
