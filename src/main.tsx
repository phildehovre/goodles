import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btzawaoaizpqdlgyxwwk.supabase.co'
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
