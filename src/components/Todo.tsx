import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Todos.scss'
import Spinner from './Spinner'

function Todo(props: {
    todo: any,
    handleDelete: (id: string) => void
    isDeleting: boolean
}) {
    const { todo, handleDelete, isDeleting } = props

    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div className='todo-ctn'
            onMouseEnter={() => { setIsHovered(true) }}
            onMouseLeave={() => { setIsHovered(false) }}
        >
            <div
            >{todo.title}</div>
            {isHovered &&
                <div className='todo-delete'>
                    {
                        isDeleting
                            ? <Spinner />
                            : <FontAwesomeIcon
                                icon={faClose}
                                onClick={() => handleDelete(todo.calendar_id)}
                            />
                    }
                </div>
            }
        </div>
    )
}

export default Todo