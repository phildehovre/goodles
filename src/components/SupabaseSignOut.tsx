import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import './Dropdown.scss'




function SupabaseSignOut() {

    const session = useSession(); //tokens, when session exists, we have a user
    const supabase = useSupabaseClient(); // talk to supabase

    async function signOut() {
        await supabase.auth.signOut().then(() => sessionStorage.clear())
    }

    return (
        <li style={{ textAlign: 'left' }}
            onClick={() => { signOut() }}>
            Sign out
        </li>
    )
}

export default SupabaseSignOut