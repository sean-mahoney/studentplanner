import React from 'react'
import LoginButtonLarge from './Buttons/LoginButtonLarge';
import SignupButtonLarge from './Buttons/SignupButtonLarge';
import { useAuth0 } from '@auth0/auth0-react';

function ContentBarSection() {

    const { isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className='contentbar'>
                <h2>Get Started</h2>
                <div className='content-btns'>
                    <SignupButtonLarge />
                    <LoginButtonLarge />
                </div>
            </div>
        )
    )
}

export default ContentBarSection