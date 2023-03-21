import { backOff } from 'exponential-backoff';
import dayjs from "dayjs";


export async function postTodos(events: any, session: any) {
    for (let i = 0; i < events.length; i++) {
        try {
            const response = await backOff(() => formatAndPostTodo(events[i], session))
        } catch (e) {
            console.log('error: ', e)
        }
    }
}


async function formatAndPostTodo(todo: any, session: any) {
    const start = dayjs(todo.startDate)
    const end = dayjs(todo.endDate)

    const event = {
        'summary': todo.title,
        'description': todo.title,
        'start': {
            'dateTime': start.toISOString(),
            'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'end': {
            'dateTime': end.toISOString(),
            'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'id': todo.calendar_id
    }

    try {
        await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                // @ts-ignore
                'Authorization': 'Bearer ' + session.provider_token
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data)
        });
    } catch (error) {
        console.log(error)
    }
}
async function formatAndUpdateTodo(todo: any, session: any) {
    const event = {
        'summary': todo.title,
        'description': todo.title,
        'start': {
            'dateTime': todo.startDate.toISOString(),
            'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'end': {
            'dateTime': todo.endDate.toISOString(),
            'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        'id': todo.id
    }

    try {
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${todo.id}`, {
            method: 'PUT',
            headers: {
                // @ts-ignore
                'Authorization': 'Bearer ' + session.provider_token
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        });
    } catch (error) {
        alert('Unable to create event at this time: ' + error)
    }
}


export async function deleteCalendarEvent(id: string, session: any) {
    try {
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`, {
            method: 'DELETE',
            headers: {
                // @ts-ignore
                'Authorization': 'Bearer ' + session.provider_token
            },
        }).then((data) => {
            console.log(JSON.stringify(data))
        })
    } catch (error) {
        alert('Unable to delete event at this time: ' + error)
    }
}

export const deleteCalendarEvents = async (todos: [], session: any) => {
    let idArray = todos.map((todo: { id: string }) => {
        return todo.id
    })
    for (let i = 0; i < todos.length; i++) {
        await deleteCalendarEvent(idArray[i], session)
    }
}