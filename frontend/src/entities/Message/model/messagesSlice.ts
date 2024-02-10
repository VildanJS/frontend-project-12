import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { type StateSchema } from '@/app/provider/store'
import { rtkApi } from '@/shared/api/rtkApi'
import { channelApiRemove } from '@/features/channel/RemoveChannel'

export interface MessageType {
    body: string,
    channelId: number;
    username: string;
    id: number;
}

const messagesAdapter = createEntityAdapter<MessageType>();

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            rtkApi.endpoints.getChannelsAndMessages.matchFulfilled,
            (state, { payload }) => {
                messagesAdapter.setAll(state, payload.messages)
            }
        )
        builder.addMatcher(
            channelApiRemove.endpoints.removeChannel.matchFulfilled,
            (state, { payload }) => {
                const restEntities = Object.values(state.entities)
                    .filter((message) => message.channelId !== payload.id)
                messagesAdapter.setAll(state, restEntities);
            }
        )
    },
})

export const { reducer: messageReducer } = messagesSlice

export const messagesSelector = messagesAdapter.getSelectors<StateSchema>((state) => state.messages);

export const getMessagesByChannelId = (id: number) => createSelector(messagesSelector.selectAll, (messages) => {
        return messages.filter((message) => message.channelId === id)
    }
)

export const getMessagesCountByChannelId = (id: number) => createSelector(messagesSelector.selectAll, (messages) => {
        return messages.reduce((acc, message) => {
            if(message.channelId === id) return ++acc
            return acc
        }, 0)
    }
)


