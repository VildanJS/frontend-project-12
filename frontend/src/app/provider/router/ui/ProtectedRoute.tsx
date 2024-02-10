import React from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/Auth/model/sliceAuth'

export const ProtectedRoute: FC<PropsWithChildren> = (props) => {
    const user = useSelector(selectCurrentUser)
    // Check if the user is authenticated
    if (user === null) {
        return <Navigate to='/login' />
    }
    return props.children
}
