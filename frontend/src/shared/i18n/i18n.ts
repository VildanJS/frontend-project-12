import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'

export const initI18n = () => {
    const i18nextInstance = i18n.createInstance();
    return i18nextInstance
        .use(Backend)
        .use(initReactI18next)
        .init({
            lng: 'ru',
            fallbackLng: 'ru',
            debug: __IS_DEV__,
            interpolation: {
                escapeValue: false,
            },
        })
}
