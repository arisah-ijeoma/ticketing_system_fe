import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap';
import React, { Component } from 'react';

function query(url, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(url,
      { method: 'POST',
        headers: myHeaders,
        body: body })
      .then( response => response.json())
      .then( customer => {
        console.log(customer);
      })
      .catch( error => {
        console.log(error, "error");
      });
}

class AuthenticationForm extends Component {
  state  = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    checked: true,
    button: 'Sign in'
  }

  handleChange (e) {
    var newState = {}
    newState[e.target.id] = e.target.value;
    this.setState(...this.state, newState)
  }

  getUser({first_name, last_name, email, password, checked}) {
    if (checked) {
      return { email, password };
    }
    return {first_name, last_name, email, password}
  }

  submit (e) {
    if (this.state.checked) {
      return this.signin(this.getUser(this.state));
    }
    return this.signup({customer: this.getUser(this.state)});
  }

  signup(user) {
    var signUpUser = JSON.stringify(user);
    query('http://localhost:3000/customers', signUpUser );
  }

  signin (user) {
    var signInUser = JSON.stringify(user);
    query('http://localhost:3000/sessions', signInUser );
  }

  checkBox (e) {
    const checked =  e.target.checked
    if (!checked) {
      this.setState({checked , button: 'Sign up' })
    } else {
      this.setState({checked, button: 'Sign in'})
    }
  }

  renderNames() {
      if (this.state.checked) {
        return (<div></div>)
      }
      return  (
          <div>
              <FormControl
                  type='text'
                  id='first_name'
                  value={this.state.first_name}
                  placeholder='First Name'
                  onChange={this.handleChange.bind(this)}
              />

              <FormControl
                type='text'
                id='last_name'
                value={this.state.last_name}
                placeholder='Last Name'
                onChange={this.handleChange.bind(this)}
              />
          </div>)
  }



  render () {
    return (

        <form>
            <FormGroup
            >

              { this.renderNames() }

              <FormControl
                  type="text"
                  id="email"
                  value={this.state.email}
                  placeholder="Email Address"
                  onChange={this.handleChange.bind(this)}
              />
              <FormControl
                  type="password"
                  id="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
            <Button
              onClick={this.submit.bind(this)}>
              { this.state.button }
            </Button>

            <div className="pull-right">
              <Checkbox defaultChecked={true}
                  onChange={this.checkBox.bind(this)}>
                <p>Already have an account</p>
              </Checkbox>
            </div>
        </form>
    )
  }

}

module.exports = AuthenticationForm;