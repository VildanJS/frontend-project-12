import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema'
import { authReducer } from '@/features/Auth'
import { rtkApi } from '@/shared/api/rtkApi'
import { messageReducer } from '@/entities/Message'
import { channelReducer } from '@/entities/Channel'


export const createReduxStore = (initialState: StateSchema) => configureStore({
    reducer: {
        auth: authReducer,
        channels: channelReducer,
        messages: messageReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([rtkApi.middleware]),
});

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
