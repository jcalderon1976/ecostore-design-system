import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ds/styles/index.css'
import { App } from './App'
import { redirectLegacyHash } from './pages/site'

redirectLegacyHash()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
