import React from 'react';
import kid from '../images/kid.jpg';
import desk from '../images/desk.jpg';
import combo from '../images/combo.jpg';
import { useAuth0 } from '@auth0/auth0-react';

function ContentSection() {

    const { isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className='content-container'>
                <div className='content-image'>
                    <img src={kid} alt="Kid writing at desk" />;
                </div>
                <div className='content'>
                    <h2>Make Study Plans</h2>
                    <p>Create detailed and effective study plans to help you power through your courses, essays and homework with ease.</p>
                </div>
                <div className='content-image'>
                    <img src={desk} alt="Child using student planner app for homework" />;
                </div>
                <div className='content'>
                    <h2>To Do List Managment</h2>
                    <p>Make lists of all of the tasks you need to manage in order to complete your assignments. Manage your tasks and check them off as you go with Study Planner.</p>
                </div>
                <h3>Interactive Study</h3>
                <div className='content'>
                    <h2>Keep Track of Your Progress</h2>
                    <p>Make lists of all of the tasks you need to manage in order to complete your assignments. Manage your tasks and check them off as you go with Study Planner.</p>
                </div>
                <div className='content-image'>
                    <img src={combo} alt="Combination of two photos of people using the app" />;
                </div>
            </div>
        )
    )
}

export default ContentSection
