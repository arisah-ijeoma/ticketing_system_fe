import React, { Component } from 'react';
import Home from './Home.js';
import AuthenticationForm from './AuthenticationForm.js';
import { Modal } from 'react-bootstrap';
import '../stylesheet/App.css';

class App extends Component {

  state = {
    isAuthenticated: false,
    user: {}
  }

  logout() {
    localStorage.removeItem('app-user');
    this.setState({isAuthenticated: false, user:{}})
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('app-user')) || {};
    this.setState({user, isAuthenticated: user.token !== undefined })
  }

  didAuthenticate(user) {
    localStorage.setItem('app-user', JSON.stringify(user))
    this.setState({user, isAuthenticated: true })
  }

  render() {
    const { user, isAuthenticated } = this.state
      return(
          <div>
            <Modal show={!isAuthenticated} enforceFocus={true} >
              <Modal.Body>
              <AuthenticationForm isAuthenticated={isAuthenticated}
                  authenticated={this.didAuthenticate.bind(this)} />
              </Modal.Body>
            </Modal>
            <Home onLogout={this.logout.bind(this)} user={user}/>
          </div>
      )
  }
}

export default App;
