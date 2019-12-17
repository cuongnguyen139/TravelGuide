import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class DetailConferenceCallItem extends Component {
  render() {
    const error = this.props.error;
    let items = this.props.items;

    let item = items.map((item, index) => (
      <li key={index}>
        Number: {item.a_number} <br />
        Calls: {item.calls[0]}
      </li>
    ));

    if (item.length === 0) {
      item = "There is no scheduled call for this number";
    }

    if (!error) {
      return (
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>Scheduled Calls</Modal.Title>
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

export default DetailConferenceCallItem;
