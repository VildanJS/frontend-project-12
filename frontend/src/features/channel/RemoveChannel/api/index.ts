import { getSocket, rtkApi } from '@/shared/api/rtkApi'

export const channelApiRemove = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            removeChannel: builder.mutation<{ id: number }, { id: number }>({
                queryFn: ({ id }) => {
                    return new Promise(resolve => {
                        const socket = getSocket()
                        socket.emit(
                            'removeChannel',
                            {
                                id,
                            },
                            (res: { status: string }) => {
                                if (res.status === 'ok') {
                                    resolve(
                                        {
                                            data: { id },
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
    useRemoveChannelMutation,
} = channelApiRemove
