import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { StoreProvider } from '@/app/provider/store'
import { App } from '@/app/App'

import '@/app/styles/style.scss'

import '@/shared/i18n/i18n'


const root = createRoot(document.getElementById('root') as Element)
root.render(
    <StoreProvider>
        <Suspense fallback={(<div>Загрузка...</div>)}>
            <App />
        </Suspense>
    </StoreProvider>,
)
