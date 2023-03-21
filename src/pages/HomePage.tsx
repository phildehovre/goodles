import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import CreateTodo from '../components/CreateTodo'
import TodoList from '../components/TodoList'

function HomePage() {

    const session = useSession()

    return (
        <div>
            {
                session && <>
                    <CreateTodo />
                    <TodoList />
                </>
            }
        </div>
    )
}

export default HomePage