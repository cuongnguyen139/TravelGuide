import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DeleteNumberModal extends Component {
  render() {
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Your Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this number?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close} variant="secondary">
            No
          </Button>
          <Button onClick={this.props.delete} variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteNumberModal;
