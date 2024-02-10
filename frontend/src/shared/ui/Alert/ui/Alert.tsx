import React from 'react'

interface AlertErrorProps {
    error: string
}

export const Alert = (props: AlertErrorProps) => {
    const { error } = props

    if (error) return (
        <div className='alert alert-primary' role='alert'>
            {error}
        </div>
    )
}
