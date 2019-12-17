import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class CallLogModal extends Component {
  render() {
    const error = this.props.error;
    let items = this.props.items;

    const item = items.map((item, index) => (
      <li key={index}>
        Time: {item.start_time} <br />
        Number: {item.answerNumber[0]} <br />
        Status: {item.result}
      </li>
    ));
    if (!error) {
      return (
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>Call Logs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <div>
                  <ul>{item}</ul>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>Error: {error.message}</div>
            </div>
          </Modal.Body>
        </Modal>
      );
    }
  }
}

export default CallLogModal;
