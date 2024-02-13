import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { type AppDispatch, StateSchema } from '@/app/provider/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<StateSchema> =  useSelector
