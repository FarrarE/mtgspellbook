import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import DeckPane from './Components/DeckPane';

function App() {
  return (
    <div className="App">
      <header >
        <Nav />
        <DeckPane />
      </header>
    </div>
  );
}

export default App;
