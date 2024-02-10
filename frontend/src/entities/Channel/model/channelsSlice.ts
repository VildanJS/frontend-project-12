import { createEntityAdapter, createSelector, createSlice, type EntityState, type PayloadAction } from '@reduxjs/toolkit'
import { type StateSchema } from '@/app/provider/store'
import { rtkApi } from '@/shared/api/rtkApi'
import { channelApiRemove } from '@/features/channel/RemoveChannel'

export interface ChannelType {
    id: number;
    name: string;
    removable: boolean;
}

export interface ChannelsSchema extends EntityState<ChannelType, number> {
    currentChannelId: number
}

const channelsAdapter = createEntityAdapter<ChannelType>()

export const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState<ChannelsSchema>({
        currentChannelId: 1,
        ids: [],
        entities: {},
    }),
    reducers: {
        setCurrentChannelId: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
            state.currentChannelId = id
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            rtkApi.endpoints.getChannelsAndMessages.matchFulfilled,
            (state, { payload }) => {
                channelsAdapter.setAll(state, payload.channels)
            },
        )
        builder.addMatcher(
            channelApiRemove.endpoints.removeChannel.matchFulfilled,
            (state, { payload }) => {
                const { id } = payload
                channelsAdapter.removeOne(state, id)
                state.currentChannelId = 1
            },
        )

    },
})

export const { reducer: channelReducer } = channelsSlice
export const { setCurrentChannelId } =
    channelsSlice.actions

export const channelsSelector = channelsAdapter.getSelectors<StateSchema>((state) => state.channels)
export const getChannelNamesList = createSelector(channelsSelector.selectAll, (channels) => {
    return channels
        .map((channel) => channel.name)
})

export const getCurrentChannelId = (state: StateSchema) => state.channels.currentChannelId

