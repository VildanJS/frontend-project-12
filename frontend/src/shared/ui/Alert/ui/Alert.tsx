import React from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import {isApiResponse} from "@/shared/utils/isApiError"
interface AlertErrorProps {
    error: FetchBaseQueryError | SerializedError | undefined
}

export const Alert = (props: AlertErrorProps) => {
    const { error } = props


    if (isApiResponse(error)) {
        return (
            <div className="alert alert-primary" role="alert">
                {error.data.message}
            </div>
        )
    } else {
        return JSON.stringify(error)
    }
}
