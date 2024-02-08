import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/hooks'
import { selectCurrentUser, logout } from '@/features/Auth/model/sliceAuth'
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const user = useSelector(selectCurrentUser)

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
