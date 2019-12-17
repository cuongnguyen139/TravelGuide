import React, { Component } from 'react';
import AddPublicNumber from '../../APICalls/AddPublicNumber';
import AddOrUpdateShortNumber from '../../APICalls/AddOrUpdateShortNumber';
import { Button, Modal } from 'react-bootstrap';

class AddNumberModal extends Component {
  state = { showModal: false, showModal1: false, showModal2: false };

  handleShowModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  handleShowModal1 = () =>
    this.setState({ showModal1: true, showModal2: false });
  handleCloseModal1 = () =>
    this.setState({ showModal1: false, showModal2: false });

  handleShowModal2 = () =>
    this.setState({ showModal1: false, showModal2: true });
  handleCloseModal2 = () =>
    this.setState({ showModal1: false, showModal2: false });

  render() {
    return (
      <>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Step #1</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please choose an option</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShowModal1}>
              Add Public Number
            </Button>
            <Button variant="secondary" onClick={this.handleShowModal2}>
              Add Short Number
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal1}
          onHide={this.handleCloseModal1}
        >
          <Modal.Header closeButton>
            <Modal.Title>Step #2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <AddPublicNumber />
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showModal2}
          onHide={this.handleCloseModal2}
        >
          <Modal.Header closeButton>
            <Modal.Title>Step #2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <AddOrUpdateShortNumber data={this.props.data} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddNumberModal;
