import React from "react";

import Homepage from './app/pages/homepage';
import './App.css';
import Header from './app/components/layouts/Header';
import NavBar from './app/components/layouts/NavBar';

function App() {
  return (
    <div className='App'>
      <Header/>
      <NavBar/>
      <Homepage />
    </div>
  );
}

export default App;

