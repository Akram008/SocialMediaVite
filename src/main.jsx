import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider } from './context/sidebarContext.jsx'
import { LoggedInProvider } from './context/LoginUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoggedInProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </LoggedInProvider> 
  </BrowserRouter>
)
