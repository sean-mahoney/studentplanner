import React from 'react';
import LoginButtonLarge from './Buttons/LoginButtonLarge';
import SignupButtonLarge from './Buttons/SignupButtonLarge';
import { useAuth0 } from '@auth0/auth0-react';


function HeroSection() {

    const { isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
        <div className='hero-container'>
            <div className='hero-box-container'>
                <div className='hero-box'>
                    <h1>Plan Your Studies</h1>
                    <p>
                        With the student planner application 
                        you can manage your studies in a productive, 
                        efficient and fun way. We'll help you advance 
                        your academic career with ease.
                    </p>
                    <div className='hero-btns'>
                        <SignupButtonLarge />
                        <LoginButtonLarge />
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

export default HeroSection
