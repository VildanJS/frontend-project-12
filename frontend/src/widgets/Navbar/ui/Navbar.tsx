import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FC } from 'react'
import { useAppDispatch } from '@/shared/hooks'
import { selectCurrentUserName, logout } from '@/entities/User'

export const Navbar: FC = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const user = useSelector(selectCurrentUserName)

    const handle = () => dispatch(logout())
    return (
        <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
            <div className='container'>
                <a className='navbar-brand' href='/'>{t('navbar.name')}</a>
                {user && <button onClick={handle} type='button' className='btn btn-primary'>{t('navbar.signOut')}</button>}
            </div>
        </nav>
    )
}
