import { memo, ReactNode } from 'react'
import classNames from 'classnames'

interface OverlayProps {
    onClick?: () => void
    children?: ReactNode
    isOpen: boolean
}

export const Overlay = memo((props: OverlayProps) => {
    const { children, onClick, isOpen = false } = props

    const OverlayClassname = classNames('fade', 'modal-backdrop', { show: isOpen })

    return (
        <div onClick={onClick} className={OverlayClassname}>
            {children}
        </div>
    )
})
