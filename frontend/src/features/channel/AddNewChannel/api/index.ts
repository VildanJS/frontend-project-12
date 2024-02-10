import { getSocket, rtkApi } from '@/shared/api/rtkApi'
import { type ChannelType } from '@/entities/Channel'
import { setCurrentChannelId } from '@/entities/Channel/model/channelsSlice'


export const channelApiAdd = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            addNewChannel: builder.mutation<ChannelType, {name: string}>({
                queryFn: ({ name }, {dispatch}) => {
                    return new Promise(resolve => {
                        const socket = getSocket()
                        socket.emit(
                            'newChannel',
                            {
                                name,
                            },
                            (res: { status: string, data: ChannelType }) => {
                                if (res.status === 'ok') {
                                    dispatch(setCurrentChannelId({ id: res.data.id }))
                                    resolve(
                                        {
                                            data: res.data,
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
    useAddNewChannelMutation,
} = channelApiAdd
