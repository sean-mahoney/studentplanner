import React from 'react'
import { Link } from 'react-router-dom';

function ToDoDash() {
    return (
        <div className='ToDoDash'>
            <Link to='/ToDoLists'>
                <h2>To-Do Lists</h2>
            </Link>
        </div>
    )
}

export default ToDoDash
