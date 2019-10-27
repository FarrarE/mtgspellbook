import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <header >
        <Nav />
        <Routes />
      </header>
    </div>
  );
}

export default App;
