import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <Link to='/' className='footer-logo'>
                Student Planner
            </Link>
            <ul className='footernav'>
                <li>
                    <Link to='/' className='footer-links'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/sign-up' className='footer-links'>
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link to='/log-in' className='footer-links'>
                        Log In
                    </Link>
                </li>
                <li>
                    <Link to='/help' className='footer-links'>
                        Help
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer