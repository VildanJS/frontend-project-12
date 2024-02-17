import React from 'react'
import { useTranslation } from 'react-i18next'
import { getRouteMain } from '@/shared/const'

export const NotFoundPage = () => {
    const {t} = useTranslation()
    return (
        <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='text-center'>
                <h1 className='display-1 fw-bold'>{t('notFoundPage.header')}</h1>
                <p className='fs-3'>
                    <span className='text-danger'>{t('notFoundPage.letdown')}</span> {t('notFoundPage.message')}
                </p>
                <p className='lead'
                    >{t('notFoundPage.advise')}
                </p>
                <a href={getRouteMain()} className='btn btn-primary'
                    > {t('notFoundPage.action')}
                </a>
            </div>
        </div>
    )
}
