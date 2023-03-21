import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spinner.scss'

function Spinner() {
    return (
        <FontAwesomeIcon icon={faSpinner} className='spinner' />
    )
}

export default Spinner