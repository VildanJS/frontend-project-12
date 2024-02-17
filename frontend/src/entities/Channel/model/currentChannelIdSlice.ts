import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type StateSchema } from '@/app/store'
import { DEFAULT_CHANNEL_ID } from '@/shared/const'
import { channelApi } from '../api/ChannelApi'

export const currentChannelIdSlice = createSlice({
    name: 'currentChannelId',
    initialState: DEFAULT_CHANNEL_ID,
    reducers: {
        setCurrentChannelId: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
            return id
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            channelApi.endpoints.deleteChannel.matchFulfilled,
            () => DEFAULT_CHANNEL_ID
        )
    },
})

export const { reducer: currentChannelIdReducer } = currentChannelIdSlice
export const { setCurrentChannelId } = currentChannelIdSlice.actions
export const selectCurrentChannelId = (state: StateSchema) => state.currentChannelId

