import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import MainNavbar from "./components/MainNavbar";
import ToDoLists from "./pages/ToDoLists";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Navbar />
        <MainNavbar />
        <LoginForm />
        <SignupForm />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/ToDoLists" component={ToDoLists} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
