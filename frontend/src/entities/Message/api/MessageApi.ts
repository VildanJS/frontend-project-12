import { rtkApi } from '@/shared/api/rtkApi'
import { createSelector } from '@reduxjs/toolkit'
import { socket } from '@/shared/api/socket'
import { selectCurrentChannelId } from '@/entities/Channel'

export interface MessageType {
    body: string
    channelId: string
    username: string
    id: string
}

export const messageApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Message'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMessages: builder.query<MessageType[], void>({
                query: () => '/messages',
                async onCacheEntryAdded(
                    arg,
                    { cacheDataLoaded, updateCachedData },
                ) {
                    socket.on('newMessage', (data) => {
                        updateCachedData((draft) => {
                            draft.push(data)
                        })
                    })
                    await cacheDataLoaded
                },
                providesTags: (result = []) => {
                    const messagesWithId = result.map(({ id }) => ({
                        type: 'Message' as const,
                        id,
                    }))
                    return result
                        ? [{ type: 'Message', id: 'LIST' }, ...messagesWithId]
                        : [{ type: 'Message', id: 'LIST' }]
                },
            }),
            addNewMessage: builder.mutation<
                MessageType,
                { body: string; channelId: string; username: string }
            >({
                query: ({ body, channelId, username }) => ({
                    url: '/messages',
                    method: 'POST',
                    body: { body, channelId, username },
                }),
                invalidatesTags: [{ type: 'Message', id: 'LIST' }],
            }),
            editMessage: builder.mutation<
                MessageType,
                { body: string; messageId: string }
            >({
                query: ({ body, messageId }) => ({
                    url: `/messages/${messageId}`,
                    method: 'PATCH',
                    body: { body },
                    params: { messageId },
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Message', id: arg.messageId },
                ],
            }),
            deleteMessage: builder.mutation<
                { messageId: string },
                { messageId: string }
            >({
                query: ({ messageId }) => ({
                    url: `/channels/${messageId}`,
                    method: 'DELETE',
                    body: { messageId },
                }),
                invalidatesTags: (result, error, arg) => [
                    { type: 'Message', id: arg.messageId },
                ],
            }),
        }),
    })

const selectMessagesResult = messageApi.endpoints.getMessages.select()
const selectAllMessages = createSelector(
    selectMessagesResult,
    (channelsResult) => channelsResult.data ?? [],
)
export const selectMessagesCountByChannelId = createSelector(
    selectAllMessages,
    (messages, channelId) => channelId,
    (messages, channelId) => {
        return messages.filter(
            (message: MessageType) => message.channelId === channelId,
        ).length
    },
)

export const selectMessagesCountByChannelIdRedesigned = createSelector(
    selectCurrentChannelId,
    selectAllMessages,
    (channelId, messages) => {
        return messages.filter(
            (message: MessageType) => message.channelId === channelId,
        ).length
    },
)

export const { useGetMessagesQuery, useAddNewMessageMutation } = messageApi
