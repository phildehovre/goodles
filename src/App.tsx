import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSession } from '@supabase/auth-helpers-react'
import SupabaseLogin from './components/SupabaseLogin'
import SupabaseSignOut from './components/SupabaseSignOut'

function App() {

  const session = useSession()

  console.log(session)
  return (
    <div className="App">
      <SupabaseLogin />
      <SupabaseSignOut />
    </div>
  )
}

export default App
