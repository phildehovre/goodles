import { supabase } from "../main";
import { useQuery } from "@tanstack/react-query";


const fetchTodos = async (user_id: string | undefined) => {
    try {
        const res = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', user_id)
        return res
    }
    catch (error) {
        console.log('error at fetchTodos:', error)
    }

    finally {

    }
}

export function useTodos(user_id: string | undefined) {
    return useQuery(
        ['todos', user_id],
        () => fetchTodos(user_id),
        {
            enabled: !!user_id
        }
    )
}

export const createTodo = async (todo: any) => await supabase
    .from('todos')
    .insert(todo)
    .select()

export const updateTodo = async (todo: any) => await supabase
    .from('todos')
    .insert(todo)
    .eq('id', todo.id)

export const deleteTodo = async (id: string) => await supabase
    .from('todos')
    .delete()
    .eq('calendar_id', id)