import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSession } from '@supabase/auth-helpers-react'
import SupabaseLogin from './components/SupabaseLogin'
import SupabaseSignOut from './components/SupabaseSignOut'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

function App() {



  return (
    <>
      <div className="App">
        <Navbar />
        <HomePage />
      </div>
    </>
  )
}

export default App
