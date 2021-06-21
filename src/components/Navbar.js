import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './Buttons/LoginButton';
import SignupButton from './Buttons/SignupButton';
import { useAuth0 } from '@auth0/auth0-react';
//Main navigation menu component
function Navbar() {

    const [ click, setClick ] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const { isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        Student Planner
                    </Link>
                    {/* Mobile responsive menu button*/}
                    <div className='menu-icon' onClick={ handleClick }>
                        <i className={ click ? 'fas fa-times' : 'fas fa-bars' } />
                    </div>
                    {/* Navigation Menu */}
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <LoginButton />
                        </li>
                        <li className='nav-item'>
                            <SignupButton />
                        </li>
                        <li className='nav-item'>
                            <Link to='/help' className='nav-links' onClick={closeMobileMenu}>
                                Help
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
        )
    )
}

export default Navbar
