import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div>
            The page you were looking for was not found!
            <Link to="/">Go home...</Link> 
        </div>
    )
}

export default NotFound
