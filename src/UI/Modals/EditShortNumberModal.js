import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import EditShortNumber from "../../APICalls/EditShortNumber";

class EditShortNumberModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <button onClick={this.open} className="btn bg-transparent">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.open}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit short number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <EditShortNumber
                short_number={this.props.short_number}
                id={this.props.id}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditShortNumberModal;
