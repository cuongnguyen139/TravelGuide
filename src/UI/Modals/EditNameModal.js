import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import EditName from "../../APICalls/EditName";

class EditNameModal extends Component {
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
            <Modal.Title>Edit name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <EditName id={this.props.id} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditNameModal;
