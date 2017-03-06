import { Label, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap/lib'
import React, { Component } from 'react';
import Ticket, { AddTicket } from './Ticket';
import { Modal } from 'react-bootstrap';
import '../stylesheet/App.css';
import { query } from '../common/utils'

class Home extends Component {
  state = {
    user: {},
    isAdding: false
  }


  logout(e) {
    var {user} = this.state;
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
    this.setState({user: this.props.user})
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
          console.log(data);
        })
  }

  render() {
    const { isAdding } = this.state
    var {user} = this.state;
    return (
        <div>
          <Modal show={isAdding}>
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
          <div>
            <Label>All tickets</Label>
            <Button className="pull-right" onClick={this.addTicket.bind(this)}>Add ticket</Button>
          </div>

          <Ticket />
        </div>
    );
  }
}

export default Home;


    //<div className="container">
    //<div>
    //  <div><Label>Hi {this.props.name}</Label></div>
    //  <Button className="pull-right" onClick={this.logout.bind(this)}>Log Out</Button>
// <Button className="pull-right" onClick={this.logout.bind(this)}>Add ticket</Button>
    //</div>
    //<div>
    //<Label>Tickets</Label>
    //</div>
    //<Ticket />
    //</div>