import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Lists from '../components/Lists';
import Tasks from '../components/Tasks';

const ToDoLists = () => {
    const { isAuthenticated } = useAuth0();
  
    return (
      isAuthenticated && ( 
       <div className='ToDoList'>
          <h2>To Do Lists</h2>
          <div className='ToDoList-wrapper'>
            <Lists />
            <Tasks />
          </div>
        </div>
      )
    )
  }
  
  export default ToDoLists