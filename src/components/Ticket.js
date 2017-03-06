import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap';

export default class Ticket extends Component {
  state =  {
    title: 'name',
    status: 'status'

  }


  render () {

    const { title, status } = this.state;
    return (
      <div>
        <div className='ticket-header'>
              <span>{title}</span>
              <span>{status}</span>
        </div>
        <Body description={desc} receiver={true} />
      </div>
  )
  }
}


var desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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



Body.propTypes = {
  description: React.PropTypes.string
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
    console.log(e, "button")
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
