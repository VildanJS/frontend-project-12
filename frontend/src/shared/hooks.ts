import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { type AppDispatch, StateSchema } from '@/app/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<StateSchema> =  useSelector
