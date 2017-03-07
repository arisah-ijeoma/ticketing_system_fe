import { Label, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap/lib'
import React, { Component } from 'react';
import Ticket, { AddTicket } from './Ticket';
import TicketContainer from './TicketContainer';
import { Modal } from 'react-bootstrap';
import '../stylesheet/App.css';
import { query, request } from '../common/utils'
import _ from 'lodash'

class Home extends Component {
  state = {
    user: {},
    isAdding: false
  }


  logout(e) {
    var {user} = this.state;
    console.log(user);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", user.token);
    return fetch('http://localhost:3000/sessions',
        {
          method: 'DELETE',
          headers: myHeaders
        })
        .then(response => {
          if (response.ok === true) {
            this.props.onLogout();
          }
        })
        .catch(error => {
          console.log(error, "error");
        });
  }

  componentWillMount() {
    const { user } = this.props
    this.setState({ user })
  }

  componentWillReceiveProps ({user}) {
    this.setState({user})
  }

  addTicket () {
    const { isAdding } = this.state
    this.setState({ isAdding: !isAdding })
  }

  submitTicket (body) {
    var header = {"Authorization": this.state.user.token};
    query('http://localhost:3000/tickets', header , JSON.stringify(body))
    .then( ({data}) => {
          if (data !== undefined ) {
            this.setState({isAdding: false })
          }
          console.log(data, "ghfhfgh")
          this.setState({ticket: data});
        })
  }

  render() {
    const { isAdding } = this.state
    var {user, ticket} = this.state;
    return (
        <div className="home">
          <Modal show={isAdding} enforceFocus={false}>
            <AddTicket onSubmit={this.submitTicket.bind(this)}/>
          </Modal>
          <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                Hi, { user['first-name'] +" "+ user['last-name'] }
                </Navbar.Brand>
              </Navbar.Header>
            <Navbar.Header className="pull-right">
              <Navbar.Brand>
                <Button  onClick={this.logout.bind(this)}>Log Out</Button>
              </Navbar.Brand>
            </Navbar.Header>

          </Navbar>
          <div className="ticket-menu">
            <Label>All tickets</Label>
            { user.admin === undefined ? <Button className="pull-right" onClick={this.addTicket.bind(this)}>Add ticket</Button> : "" }
          </div>

          <TicketContainer ready={user.token} newData={ticket} isAdmin={user.admin}/>
        </div>
    );
  }
}

export default Home;
