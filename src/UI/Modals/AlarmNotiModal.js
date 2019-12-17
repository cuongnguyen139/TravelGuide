import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class AlarmNotiModal extends Component {
  render() {
    return (
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.message}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlarmNotiModal;
