import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RoleProvider } from './context/RoleContext'
import { DataProvider } from './context/DataContext'
import { AlertProvider } from './context/AlertContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <DataProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </DataProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
