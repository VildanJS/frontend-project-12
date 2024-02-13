import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type StateSchema } from '@/app/provider/store'

export interface AuthSchema {
    username: null | string,
    token:  null | string
}

const initialState: AuthSchema = {
    username: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { username, token } }: PayloadAction<{ username: string; token: string }>
        ) => {
            localStorage.setItem('token', token)
            state.username = username
            state.token = token
        },
        logout: (
            state
        ) => {
            localStorage.removeItem('token')
            state.username = null
            state.token = null
        },
    },
})

export const { reducer: authReducer } = authSlice
export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUserName = (state: StateSchema) => state.auth.username;

