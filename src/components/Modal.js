import { Modal } from 'react-bootstrap';
import React, { Component } from 'react';


class SModal extends Component {

  render () {
    const { children, authenticated } = this.props;
    return (
        <div className="static-modal">
          <Modal show={!authenticated} enforceFocus={true}>

            <Modal.Body>
                { children }
            </Modal.Body>

          </Modal>
        </div>
    )
  }

}

module.exports = SModal;