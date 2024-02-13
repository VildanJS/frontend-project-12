import { type rtkApi } from '@/shared/api/rtkApi'
import type { AuthSchema } from '@/entities/User'

export interface StateSchema {
    auth: AuthSchema,
    currentChannelId: string,
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
