import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Button } from '@/shared/ui/Button'
import { useTranslation } from 'react-i18next'

interface DropdownProps extends PropsWithChildren {
    name: string,
    btnClassName?: string
}

export const Dropdown: FC<DropdownProps> = (props) => {
    const [isOpenDropdown, setIsOpenDropdownStatus] = useState(false)
    const {t} = useTranslation();

    const container = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const switchDropdownStatus = () => {
        setIsOpenDropdownStatus((status) => !status)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if(buttonRef.current?.contains(e.target as HTMLElement)) return
        if (!container.current?.contains(e.target as HTMLElement)) {
            setIsOpenDropdownStatus(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const dropdownClassname = classNames(['dropdown-menu'], { show: isOpenDropdown })
    const buttonClassname = classNames(props.btnClassName, 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn')

    return (
        <>
            <Button ref={buttonRef} onClick={switchDropdownStatus} type='button' id='react-aria7293575444-1' aria-expanded='true'
                    className={buttonClassname}>
                <span className='visually-hidden'>{t('channels.+')}</span>
            </Button>
            <div
                ref={container}
                onClick={() => setIsOpenDropdownStatus(false)}
                className={dropdownClassname}
                style={{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate3d(0px, 40px, 0px)' }}
            >
                {props.children}
            </div>
        </>
    )

}
