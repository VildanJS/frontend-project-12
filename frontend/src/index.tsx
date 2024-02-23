import { createRoot, Root } from 'react-dom/client'
import { StoreProvider } from '@/app/store'
import { App } from '@/app/App'
import { initI18n } from '@/shared/i18n/i18n'
import { initLeoProfanity } from '@/shared/leoProfanity'

import '@/app/styles/style.scss'

const init = async (root: Root) => {
    await initI18n()
    initLeoProfanity()

    root.render(
        <StoreProvider>
            <App />
        </StoreProvider>,
    )
}

const root = createRoot(document.getElementById('root') as Element)

await init(root)
