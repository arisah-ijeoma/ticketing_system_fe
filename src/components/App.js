import React, { Component } from 'react';
import Home from './Home.js';
import AuthenticationForm from './AuthenticationForm.js';
import SModal from './Modal.js';
import '../stylesheet/App.css';

class App extends Component {

  render() {

    //const userData = JSON.parse(localStorage.getItem('app-user'));
    //if (userData && userData.id) {
      return(
          <div>
            <SModal>
              <AuthenticationForm />
            </SModal>
            <Home/>
          </div>
      )

  }
}

export default App;
