import { configureStore } from '@reduxjs/toolkit';
import { type StateSchema } from './StateSchema'
import { authReducer } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import { currentChannelIdReducer } from '@/entities/Channel'


export const createReduxStore = (initialState: StateSchema) => configureStore({
    reducer: {
        auth: authReducer,
        currentChannelId: currentChannelIdReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([rtkApi.middleware]),
});

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
