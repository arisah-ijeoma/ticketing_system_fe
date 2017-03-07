import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap';

export default class Ticket extends Component {
  state =  {
    id: '',
    title: 'name',
    status: 'status',
    desc: ''
  }

  componentWillMount() {
    const { title, status, description } = this.props.ticket
    const id = this.props.id
    this.setState({ id, title, status, desc: description })

  }

  renderStatus() {
    const {canReview, resolve, review, inReview} = this.props
    if (canReview) {
     return(
         <Button
          onClick={ !inReview ? () => review(this.state.id) : () => resolve(this.state.id)}>
            {inReview ? 'Close' : 'Review' }
         </Button>
     )
    }else {
      return (<span>{this.state.status}</span>)
    }
  }

  render () {
    const { title, desc } = this.state;
    return (
      <div>
        <div className='ticket-header'>
              <span>{title}</span>
              {this.renderStatus()}
        </div>
        <Body description={desc} receiver={true} />
      </div>
  )
  }
}


class Body extends Component {
  state = {
    isReceiver: false
  }

  render () {
    const { description, receiver } = this.props;

    return (
        <div className="body-background">
          <p className={receiver ? "body-receiver" : "body-sender"}> { description } </p>
        </div>
    )
  }
}


class AddTicket extends Component {
  state = {
    title: '',
    description: ''
  }

  handleChange (e) {
    var newState = {}
    newState[e.target.id] = e.target.value;
    this.setState(...this.state, newState)
  }

  submit (e) {
    this.props.onSubmit(this.state)
  }

  render() {
    return (
        <form>
          <FormGroup>
          <FormControl
              type="text"
              id="title"
              value={this.state.title}
              placeholder="Title"
              onChange={this.handleChange.bind(this)}
          />
          <FormControl
              type="textarea"
              id="description"
              value={this.state.description}
              placeholder="Description of issue"
              onChange={this.handleChange.bind(this)}
          />
        </FormGroup>

          <Button onClick={this.submit.bind(this)}>
          Add Ticket
          </Button>
        </form>
    )
  }
}

export  {Body, AddTicket}
