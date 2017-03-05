import React, { Component } from 'react';
import Login from './Login.js';
import Home from './Home.js';
import './App.css';

class App extends Component {
  render() {

    const userData = JSON.parse(localStorage.getItem('app-user'));
    if (userData && userData.id) {
      return <Home />
    } else { return <Login /> }
  }
}

export default App;
