import React from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useNavigate } from 'react-router-dom'




function SupabaseLogin() {


    const supabase = useSupabaseClient(); // talk to supabase
    // const navigate = useNavigate()

    async function googleSignIn() {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'https://www.googleapis.com/auth/calendar', // scopes must be seperated by a space, under the same string. 
                    redirectTo: window.location.origin
                }
            },
            );
        }
        catch (error) {
            alert('Error logging in to Google with Supabase')
        }
    }

    return (
        <button
            onClick={() => { googleSignIn() }}>
            Log in
        </button>
    )
}

export default SupabaseLogin