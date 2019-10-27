import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import './App.css';
import Nav from './Components/Nav';
import Routes from "./Routes";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div className="App">
      <header >
        <Nav handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </header>
    </div>
  );
}

export default App;
