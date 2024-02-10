import { useDispatch } from 'react-redux'

import { type AppDispatch } from '@/app/provider/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
