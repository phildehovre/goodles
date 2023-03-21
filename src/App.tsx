import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSession } from '@supabase/auth-helpers-react'
import SupabaseLogin from './components/SupabaseLogin'
import SupabaseSignOut from './components/SupabaseSignOut'
import HomePage from './pages/HomePage'

function App() {

  const session = useSession()


  return (<>
    <div className="App">
      <HomePage />

      {
        session
          ? <SupabaseSignOut />
          : <SupabaseLogin />
      }
    </div>
  </>
  )
}

export default App
