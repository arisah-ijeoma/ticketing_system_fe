import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';


class SModal extends Component {

  state = {
    isAuthenticated: false
  }

  removeModal( value ) {
    this.setState({isAuthenticated: value})
  }

  render () {
    const { isAuthenticated } = this.state;
    return (
        <div className="static-modal">
          <Modal show={!isAuthenticated} enforceFocus={true}>

            <Modal.Body>
            {React.cloneElement(this.props.children, { onChange: this.removeModal.bind(this)})}
            </Modal.Body>

          </Modal>
        </div>
    )
  }

}

module.exports = SModal;