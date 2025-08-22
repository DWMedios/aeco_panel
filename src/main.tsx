import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import './index.css'
import App from './App.tsx'

import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import { useAuth } from './hooks/useAuth.ts'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHdtZWRpb3MiLCJhIjoiY204cTc4czhhMGpoNjJpcHM1YXN3ajQ4MiJ9.waihtjo6lHlnbwdW652jfA'

function InactivityHandler({ children }: { children: React.ReactNode }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/login') return
    const resetInactivityTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        console.log('User inactive for 5 minutos, logging out...')
        logout()
      }, 300000) // 5 minutos de inactividad
    }

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    )

    resetInactivityTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      )
    }
  }, [])

  return <>{children}</>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <InactivityHandler>
          <App />
        </InactivityHandler>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
