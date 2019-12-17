import React, { Component } from 'react';
import AddConferenceCall from '../../APICalls/AddConferenceCall';
import DetailConferenceCall from '../../APICalls/DetailConferenceCall';
import CallLogModal from './CallLogModal';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class COOBModal extends Component {
  state = {
    showModal: false,
    showMakeModal: false,
    showDeleteModal: false,
    showDetailModal: false,
    showLogModal: false,
    showConferenceErrorModal: false,
    showMoreThanOneConferenceErrorModal: false,
    items: [],
    error: ''
  };

  handleShowModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });

  handleShowMakeModal = () => {
    if (this.props.conferenceNumbers.length === 0) {
      this.setState({
        showModal: false,
        showConferenceErrorModal: true
      });
    } else {
      this.setState({
        showModal: false,
        showMakeModal: true
      });
    }
  };
  handleCloseMakeModal = () =>
    this.setState({
      showMakeModal: false
    });

  handleShowDeleteModal = () => {
    if (this.props.conferenceNumbers.length === 0) {
      this.setState({
        showModal: false,
        showConferenceErrorModal: true
      });
    } else {
      this.setState({
        showModal: false,
        showDeleteModal: true
      });
    }
  };

  handleCloseDeleteModal = () =>
    this.setState({
      showDeleteModal: false
    });

  handleShowDetailModal = () => {
    if (this.props.conferenceNumbers.length === 0) {
      this.setState({
        showModal: false,
        showConferenceErrorModal: true
      });
    } else if (this.props.conferenceNumbers.length > 1) {
      this.setState({
        showModal: false,
        showMoreThanOneConferenceErrorModal: true
      });
    } else {
      this.setState({
        showModal: false,
        showDetailModal: true
      });
    }
  };
  handleCloseDetailModal = () =>
    this.setState({
      showDetailModal: false
    });

  handleShowLogModal = () => {
    this.fetchConferenceLog();
    this.setState({
      showModal: false,
      showLogModal: true
    });
  };
  handleCloseLogModal = () =>
    this.setState({
      showLogModal: false
    });

  handleCloseConferenceErrorModal = () =>
    this.setState({
      showConferenceErrorModal: false
    });

  handleCloseMoreThanOneConferenceErrorModal = () =>
    this.setState({
      showMoreThanOneConferenceErrorModal: false
    });

  deleteConferenceNumber = () =>
    this.props.conferenceNumbers.forEach(number => {
      axios
        .post(process.env.url + '/deleteConferenceCall.php', {
          a_number: number
        })
        .then(
          res => {
            window.location.reload(true);
          },
          error => {
            console.log(error);
          }
        );
    });

  fetchConferenceLog = () => {
    fetch(process.env.url + '/fetchConferenceCall.php')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            items: result
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
  }
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

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
            <Button variant="secondary" onClick={this.handleShowMakeModal}>
              Add Call
            </Button>
            <Button variant="secondary" onClick={this.handleShowDetailModal}>
              Show Call
            </Button>
            <Button variant="secondary" onClick={this.handleShowDeleteModal}>
              Delele Call
            </Button>
            <Button variant="secondary" onClick={this.handleShowLogModal}>
              Call Log
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showMakeModal}
          onHide={this.handleCloseMakeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Step #2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <AddConferenceCall />
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showDeleteModal}
          onHide={this.handleCloseDeleteModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Scheduled Call</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this scheduled call?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseDeleteModal} variant="secondary">
              No
            </Button>
            <Button onClick={this.deleteConferenceNumber} variant="primary">
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showDetailModal}
          onHide={this.handleCloseDetailModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Step #2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <DetailConferenceCall />
            </div>
          </Modal.Body>
        </Modal>

        <CallLogModal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showLogModal}
          onHide={this.handleCloseLogModal}
          items={this.state.items}
        />

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showConferenceErrorModal}
          onHide={this.handleCloseConferenceErrorModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please choose at least a conference number</Modal.Body>
        </Modal>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showMoreThanOneConferenceErrorModal}
          onHide={this.handleCloseMoreThanOneConferenceErrorModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please choose only one conference number</Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    conferenceNumbers: state.conference.conferenceNumbers
  };
};

export default connect(mapStateToProps)(COOBModal);
