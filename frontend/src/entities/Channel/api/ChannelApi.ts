import { createSelector } from '@reduxjs/toolkit'
import { rtkApi } from '@/shared/api/rtkApi'
import { messageApi } from '@/entities/Message'
import { io } from 'socket.io-client'

export interface ChannelType {
    id: string;
    name: string;
    removable: boolean;
}

export const channelApi = rtkApi.enhanceEndpoints({ addTagTypes: ['Channel'] }).injectEndpoints({
        endpoints: (builder) => ({
            getChannels: builder.query<ChannelType[], void>({
                query: () => '/channels',
                async onCacheEntryAdded(
                    arg,
                    { cacheDataLoaded, updateCachedData },
                ) {
                    const socket = io()
                    socket.on('newChannel', (data) => {
                        updateCachedData((draft) => {
                            draft.push(data)
                        })
                    })

                    await cacheDataLoaded
                    // socket.off('newChannel')
                },
                providesTags: (result = []) => {
                    const channelsWithId = result.map(({ id }) => ({ type: 'Channel' as const, id }))
                    return result
                        ? [{ type: 'Channel', id: 'LIST' }, ...channelsWithId]
                        : [{ type: 'Channel', id: 'LIST' }]
                },
            }),
            addNewChannel: builder.mutation<ChannelType, { name: string }>({
                query: ({ name }) => ({
                    url: 'channels',
                    method: 'POST',
                    body: { name },
                }),
                invalidatesTags: [{ type: 'Channel', id: 'LIST' }],
            }),
            editChannel: builder.mutation<ChannelType, { name: string, id: string }>({
                query: ({ name, id }) => ({
                    url: `/channels/${id}`,
                    method: 'PATCH',
                    body: { name, id },
                }),
                invalidatesTags: (result, error, arg) => [{ type: 'Channel', id: arg.id }],
            }),
            deleteChannel: builder.mutation<ChannelType, { id: string }>({
                query: ({ id }) => ({
                    url: `/channels/${id}`,
                    method: 'DELETE',
                    body: { id },
                }),
                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    const patchMessagesRes = dispatch(
                        messageApi.util.updateQueryData('getMessages', undefined, draft => {
                            return draft.filter(message => message.channelId !== id)
                        }),
                    )
                    try {
                        await queryFulfilled
                    } catch {
                        patchMessagesRes.undo()
                    }
                },
                invalidatesTags: (result, error, arg) => [{ type: 'Channel', id: arg.id }],
            }),
        }),
    },
)

const selectChannelsResult = channelApi.endpoints.getChannels.select()
const selectAllChannels = createSelector(
    selectChannelsResult,
    channelsResult => channelsResult.data ?? [],
)
export const selectAllChannelsNames = createSelector(
    selectAllChannels,
    (channels) => channels.map(channel => channel.name),
)

export const selectChannelById = createSelector(
    selectAllChannels,
    (channels, channelId) => channelId,
    (channels, channelId) => channels.find((channel: ChannelType) => channel.id === channelId),
)

export const {
    useGetChannelsQuery,
    useAddNewChannelMutation,
    useEditChannelMutation,
    useDeleteChannelMutation,
} = channelApi
