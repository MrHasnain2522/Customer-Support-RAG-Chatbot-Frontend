import React from 'react';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ChatInterface />
    </div>
  );
}

export default App;