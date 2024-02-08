import { rtkApi } from '@/shared/api/rtkApi'
import type { AuthSchema } from '@/features/Auth'
import type { MessageType } from '@/entities/Message'
import type { ChannelsSchema } from '@/entities/Channel'
import { EntityState } from '@reduxjs/toolkit'


export interface StateSchema {
    auth: AuthSchema,
    messages: EntityState<MessageType, number>,
    channels: ChannelsSchema,
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
