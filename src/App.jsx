import './App.css'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/common/Footer'

export default function App() {
  const location = useLocation()
  const showFooter = !['/login', '/signup'].includes(location.pathname)

  return (
    <>
      <AppRoutes /><br/>
      {showFooter && <Footer />}
    </>
  )
}
