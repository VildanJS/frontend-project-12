import React, { forwardRef } from 'react'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>{
    children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
    const { children, ...rest} = props

    return (
        <button
            ref={ref}
            {...rest}
        >
            {props.children}
        </button>
    )
})

