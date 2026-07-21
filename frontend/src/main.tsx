import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './Styles/global.css'
import './styles/layout.css'
import './styles/componentsCss/componentsGeral.css'
import './styles/componentsCss/componentsTransacao.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)