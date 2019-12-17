import React from 'react';
import DetailConferenceCallItem from '../UI/Modals/DetailConferenceCallItem';
import { connect } from 'react-redux';
import axios from 'axios';

class DetailConferenceCall extends React.Component {
  state = {
    showDetailConferenceCall: false,
    conferenceCallItems: [],
    start_time: '',
    end_time: '',
    error: null,
    errors: {
      date: ''
    }
  };

  handleshowDetailConferenceCall = () => {
    this.setState({
      showDetailConferenceCall: true
    });
  };

  handleCloseDetailConferenceCall = () => {
    this.setState({
      showDetailConferenceCall: false
    });
  };

  validateDate = inputText => {
    const dateformat = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    // Match the date format through regular expression
    if (inputText.match(dateformat)) {
      const pdate = inputText.split('-');
      const yy = parseInt(pdate[0]);
      const mm = parseInt(pdate[1]);
      const dd = parseInt(pdate[2]);
      // Create list of days of a month [assume there is no leap year by default]
      const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mm === 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
          return false;
        }
      }
      if (mm === 2) {
        let lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          lyear = true;
        }
        if (lyear === false && dd >= 29) {
          return false;
        }
        if (lyear === true && dd > 29) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  onChange = e => {
    if (
      this.state.errors.start_time !== '' ||
      this.state.errors.end_time !== ''
    ) {
      this.setState({
        errors: {
          start_time: '',
          end_time: ''
        }
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postDataHandler = e => {
    //e.preventDefault();
    if (this.state.start_time === '' && this.state.end_time === '') {
      e.preventDefault();
      this.setState({
        errors: {
          start_time: 'Start date is required',
          end_time: 'End date is required'
        }
      });
      return;
    }

    if (this.state.start_time === '') {
      e.preventDefault();
      this.setState({
        errors: { start_time: 'Start date is required' }
      });
      return;
    }

    if (!this.validateDate(this.state.start_time)) {
      e.preventDefault();
      this.setState({
        errors: { start_time: 'Invalid date' }
      });
      return;
    }

    if (this.state.end_time === '') {
      e.preventDefault();
      this.setState({
        errors: { end_time: 'End date is required' }
      });
      return;
    }

    if (!this.validateDate(this.state.end_time)) {
      e.preventDefault();
      this.setState({
        errors: { end_time: 'Invalid date' }
      });
      return;
    }

    if (
      this.state.errors.start_time === '' &&
      this.state.errors.end_time === ''
    ) {
      e.preventDefault();
      this.props.conferenceNumbers.forEach(number => {
        axios
          .post(process.env.url + '/fetchConferenceCallDetail.php', {
            a_number: number,
            start_time: this.state.start_time,
            end_time: this.state.end_time
          })
          .then(
            res => {
              this.setState({
                showDetailConferenceCall: true,
                conferenceCallItems: res.data.calls_out_of_blue
              });
              //window.location.reload(true);
            },
            error => {
              console.log(error);
            }
          );
      });
    } else {
      console.log(this.state.errors);
    }
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="Date">Starting Date</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  value={this.state.start_time}
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                  name="start_time"
                />
                {this.state.errors.start_time ? (
                  <small className="form-text text-danger">
                    {this.state.errors.start_time}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="Date">Ending Date</label>
                <input
                  onChange={this.onChange}
                  type="text"
                  value={this.state.end_time}
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                  name="end_time"
                />
                {this.state.errors.end_time ? (
                  <small className="form-text text-danger">
                    {this.state.errors.end_time}
                  </small>
                ) : null}
              </div>
              <button
                onClick={this.postDataHandler}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <DetailConferenceCallItem
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.showDetailConferenceCall}
          onHide={this.handleCloseDetailConferenceCall}
          items={this.state.conferenceCallItems}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conferenceNumbers: state.conference.conferenceNumbers
  };
};

export default connect(mapStateToProps)(DetailConferenceCall);
