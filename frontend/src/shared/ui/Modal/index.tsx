import React, { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from '@/shared/ui/Button'

export interface ModalProps extends PropsWithChildren {
    children?: React.ReactNode
    header?: string
    isOpen: boolean
    onClose: () => void
}


export function useModalState(): [boolean, () => void, () => void] {
    const [status, setStatus] = useState(false)

    const setModalClose = useCallback(() => {
        setStatus(false)
    }, [])

    const setModalShow = useCallback(() => {
        setStatus(true)
    }, [])

    return [status, setModalClose, setModalShow]
}


export const Modal = (props: ModalProps) => {

    const { header, isOpen, onClose } = props

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            onClose()
        }
    }, [onClose])

    useEffect(() => {
        if (isOpen) window.addEventListener('keydown', onKeyDown)
        return () => { window.removeEventListener('keydown', onKeyDown); }
    }, [isOpen, onKeyDown])


    const ModalClassname = classNames(['fade', 'modal'], { show: isOpen })

    return (
        <>
            <div role='dialog' aria-modal='true' className={ModalClassname} tabIndex={-1} style={{ display: 'block' }}>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <div className='modal-title h4'>{header}</div>
                            <Button
                                type='button' aria-label='Close'
                                data-bs-dismiss='modal' className='btn btn-close'
                                onClick={onClose}
                            />
                        </div>
                        <div className='modal-body'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
