import React, { Component } from 'react';
import Home from './Home.js';
import AuthenticationForm from './AuthenticationForm.js';
import SModal from './Modal.js';
import '../stylesheet/App.css';

class App extends Component {

  state = {
    authenticated: false
  }

  logout() {
    localStorage.removeItem('app-user');
    this.setState({authenticated: false})
  }

  componentWillMount() {
    const userData = JSON.parse(localStorage.getItem('app-user')) || {};
    this.setState({ authenticated: userData.token !== undefined })
  }

  render() {
      console.log(this.state.authenticated);
      return(
          <div>
            <SModal isAuthenticated={this.state.authenticated} >
              <AuthenticationForm />
            </SModal>
            <Home onLogout={this.logout.bind(this)}/>
          </div>
      )

  }
}

export default App;
