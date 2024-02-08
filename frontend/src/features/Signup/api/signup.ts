import { rtkApi } from '@/shared/api/rtkApi'

interface AuthResponse {
    username: string
    token: string
}

export const authApi = rtkApi.injectEndpoints({
        endpoints: (builder) => ({
            signupUser: builder.mutation<AuthResponse, { username: string, password: string }>(
                {
                    query: (data) => {
                        return {
                            url: 'signup',
                            method: 'POST',
                            body: data,
                        }
                    },
                },
            ),
        }),
    },
)

export const {
    useSignupUserMutation,
} = authApi
