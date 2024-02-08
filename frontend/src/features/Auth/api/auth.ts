import { rtkApi } from '@/shared/api/rtkApi'
import { LoginInput } from '../ui/LoginForm'


interface AuthResponse {
    username: string
    token: string
}

export const authApi = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            loginUser: builder.mutation<AuthResponse, LoginInput>(
                {
                    query: (data) => {
                        return {
                            url: 'login',
                            method: 'POST',
                            body: data,
                            credentials: 'include',
                        }
                    },
                },
            )
        }),
    },
)

export const {
    useLoginUserMutation,
} = authApi
