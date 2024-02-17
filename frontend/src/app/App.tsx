import { type FC, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { AppRouter } from '@/app/router'

export const App: FC = () => {
    const { t } = useTranslation()
    return (
        <Suspense fallback={(<div>{t('common.loading')}</div>)}>
            <AppRouter />
        </Suspense>)
}

