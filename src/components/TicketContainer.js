import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap'
import Ticket from './Ticket'
import { query, request } from '../common/utils'
import '../stylesheet/App.css'

export default class TicketContainer extends Component {

  state = {
    tickets: []
  }

  componentWillMount() {
    const {ready} = this.props;
    if (ready !== undefined) {
      this.getAllTickets(ready)
    }
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.ready === undefined) {
      this.setState({tickets:[]})
    } else {
      this.getAllTickets(nextProp.ready)
    }

    if (nextProp.newData) {
      var tickets = this.state.tickets
      tickets.push(this.props.newData)
      return
    }
  }


  resolved(ticket) {
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", this.props.ready);
    fetch('http://localhost:3000/tickets/'+ticket+'/resolved', {
      method: 'PUT',
      headers: header
    }).then(response => response.json())
    .then(data => {
          this.setState({ticket:[...this.state.tickets, { id: data.id, attributes: data.ticket }]})
        }
    ).catch(error => {
          console.log(error)
        })
  }


  review(ticket) {
    var header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", this.props.ready);
    fetch('http://localhost:3000/tickets/'+ticket+'/assign_to_self', {
      method: 'PUT',
      headers: header
    }).then(response => response.json())
    .then(data => {
          this.setState({ticket:[...this.state.tickets, { id: data.id, attributes: data.ticket }]})
        }
    ).catch (error => {
      console.log(error, 'here')
    })
  }

  getAllTickets(token) {
    var header = {"Authorization": token};

    request('http://localhost:3000/tickets', header).
        then( tickets => {
          this.setState({tickets: tickets.data})
        })
  }

  render() {
    const {isAdmin} = this.props

    return (
        <div className="list-group">
          <ListGroup>
            {this.state.tickets.map(function({id, attributes, relationships}, i) {
              const ticket = attributes;
              return (
                  <li key={i} className="no-list-style">
                    <Ticket ticket={ticket}
                        id={id}
                        canReview={isAdmin !== undefined && ticket.status !== 'Resolved' }
                        review={this.review.bind(this)}
                        resolve={this.resolved.bind(this)}
                        inReview={ticket.status === 'In Review'}
                    />
                  </li>
              );
            }.bind(this))}
          </ListGroup>
        </div>
    )
  }
}