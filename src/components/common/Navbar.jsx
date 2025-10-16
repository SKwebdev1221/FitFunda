import { useState, useEffect } from 'react'
import '../../App.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    window.location.href = '/'
  }

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md shadow-md transition-all duration-300 ${scrolled ? 'bg-white/70' : 'bg-transparent'}`}>
      <div className="flex items-center m-5 w-full">
        <div className={`${scrolled ? 'text-black' : 'text-white'} font-extrabold text-xl md:text-2xl mr-20 h-font`}>
          <a href="/Home">Swasthya</a>
        </div>

        <ul className={`hidden md:flex space-x-8 font-light ${scrolled ? 'text-black' : 'text-white'}`}>
          <li><a href="/dosha" className="hover:text-primary transition-colors duration-200">Dosha</a></li>
          <li><a href="/SymptomRecommender" className="hover:text-primary transition-colors duration-200">Remedy-Finder</a></li>
          <li><a href="/OnlineConsultation" className="hover:text-primary transition-colors duration-200">Online-Consultation</a></li>
          <li><a href="/NearbyClinics" className="hover:text-primary transition-colors duration-200">Clinics</a></li>
          <li><a href="/AyurvedaGarden" className="hover:text-primary transition-colors duration-200">Ayurveda-Garden</a></li>
        </ul>

        <li className="ml-auto list-none relative inline-block">
          {localStorage.getItem('token') ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-4 py-2 ${scrolled ? 'text-black' : 'text-white'} bg-transparent hover:bg-white/10 rounded transition duration-200 flex items-center space-x-1`}
              >
                <span>{localStorage.getItem('userName')}</span>
                <svg className={`w-4 h-4 ${scrolled ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  <a href="/UserDashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/login" className={`px-4 py-2 ${scrolled ? 'text-black border-black' : 'text-white'} rounded shadow transition duration-200 mr-3`}>Login</a>
              <a href="/register" className={`px-4 py-2 ${scrolled ? 'text-black border-black' : 'text-white'} rounded shadow transition duration-200`}>Register</a>
            </>
          )}
        </li>

        <div className="md:hidden">
          <button className="text-primary focus:outline-none" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}