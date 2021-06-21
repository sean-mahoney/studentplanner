import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MainNavbar from './components/MainNavbar';
import ToDoLists from './pages/ToDoLists';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Router>
        <Navbar />
        <MainNavbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/' component={ToDoLists} />
        </Switch>
      </Router>
    </>
  );
}

export default App;