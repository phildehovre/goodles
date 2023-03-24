import React from 'react'
import './CardWrapper.scss'

function CardWrapper(props: {
    children: React.ReactNode
    title?: string
}) {
    return (
        <div className='card_wrapper'>
            <h4 className='card_title'>{props.title}</h4>
            <div>{props.children}</div>
        </div>
    )
}

export default CardWrapper