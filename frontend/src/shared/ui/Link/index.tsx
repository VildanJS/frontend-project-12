import React, { forwardRef, PropsWithChildren } from 'react'
import classNames from 'classnames'

interface AppLinkProps {
    className: string
    onClick: () => void
    role: string
}

export const AppLink= forwardRef<HTMLAnchorElement, PropsWithChildren<AppLinkProps>>((props, ref) => {
    const {
        children,
        className,
        ...rest
    } = props

    const appLinkClass = classNames(className)

    return (
        <a
            ref={ref}
            className={appLinkClass}
            {...rest}
        >
            {children}
        </a>
    )
})
