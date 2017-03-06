import { Table, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import '../stylesheet/App.css';

class Home extends Component {

  logout (e) {
    var user = JSON.parse(localStorage.getItem('app-user'));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", user.token);
    return fetch( 'http://localhost:3000/sessions',
          { method: 'DELETE',
            headers: myHeaders})
          .then( response => {
              if (response.ok === true) {
                this.props.onLogout();
              }
          })
          .catch( error => {
            console.log(error, "error");
          });
  }

  render() {
    return (
        <div className="container">
          <Button className="pull-right" onClick={this.logout.bind(this)}>Log Out</Button>
          <h2>All Tickets</h2>
          <Table striped bordered condensed hover>
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td></td>
                      <td></td>
                  </tr>
              </tbody>
          </Table>
        </div>
    );
  }
}

export default Home;
