import React from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUserName } from '@/entities/User'

export const ProtectedRoute: FC<PropsWithChildren> = (props) => {
    const user = useSelector(selectCurrentUserName)
    if (user === null) {
        return <Navigate to='/login' />
    }
    return props.children
}
