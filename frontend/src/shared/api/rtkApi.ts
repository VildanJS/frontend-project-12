import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const'

export const rtkApi = createApi({
        reducerPath: 'rtkApi',
        baseQuery: fetchBaseQuery({
            baseUrl: '/api/v1',
            prepareHeaders: (headers) => {
                const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
                if (TOKEN_LOCALSTORAGE_KEY) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers
            },
        }),
        endpoints: () => ({}),
    },
)
