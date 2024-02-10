import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io, Socket } from 'socket.io-client'
import type { MessageType } from '@/entities/Message'
import type { ChannelType } from '@/entities/Channel'

export interface DataResponse {
    channels: ChannelType[];
    messages: MessageType[];
    currentChannelId: number;
}

let socket: Socket

export function getSocket() {
    if (!socket) {
        socket = io()
    }
    return socket
}


export const rtkApi = createApi({
        reducerPath: 'rtkApi',
        tagTypes: ['Channel', 'Message'],
        baseQuery: fetchBaseQuery({
            baseUrl: '/api/v1',
            prepareHeaders: (headers) => {
                const token = localStorage.getItem('token')
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers
            },
        }),

        endpoints: (builder) => ({
            getChannelsAndMessages: builder.query<DataResponse, void>(
                {
                    query: () => '/data',
                    async onCacheEntryAdded(
                        arg,
                        { cacheDataLoaded, updateCachedData },
                    ) {
                        const socket = getSocket()
                        socket.on('connect', () => {})

                        socket.on('newMessage', (data) => {
                            updateCachedData((draft) => {
                                draft.messages.push(data)
                            })
                        })

                        socket.on('newChannel', (data) => {
                            updateCachedData((draft) => {
                                draft.channels.push(data)
                            })
                        })


                        await cacheDataLoaded
                        socket.off('connect')


                    },
                    providesTags: () => {
                        return ['Channel', 'Message']
                    },
                },
            ),


        }),
    },
)
export const {
    useGetChannelsAndMessagesQuery,
} = rtkApi
