import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AddConferenceCall extends React.Component {
  state = {
    date: '',
    time: '',
    error: null,
    errors: {
      date: '',
      time: ''
    }
  };

  validateTime = inputText => {
    const timeformat = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (inputText.match(timeformat)) {
      return true;
    } else {
      return false;
    }
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
    if (this.state.errors.date !== '' || this.state.errors.time !== '') {
      this.setState({
        errors: {
          date: '',
          time: ''
        }
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postDataHandler = e => {
    //e.preventDefault();
    if (this.state.date === '' && this.state.time === '') {
      e.preventDefault();
      this.setState({
        errors: {
          date: 'Date is required',
          time: 'Time number is required'
        }
      });
      return;
    }

    if (this.state.date === '') {
      e.preventDefault();
      this.setState({
        errors: { date: 'Date is required' }
      });
      return;
    }

    if (!this.validateDate(this.state.date)) {
      e.preventDefault();
      this.setState({
        errors: { date: 'Invalid date' }
      });
      return;
    }

    if (this.state.time === '') {
      e.preventDefault();
      this.setState({
        errors: { time: 'Time number is required' }
      });
      return;
    }

    if (!this.validateTime(this.state.time)) {
      e.preventDefault();
      this.setState({
        errors: { time: 'Invalid time' }
      });
      return;
    }

    console.log(this.props.conferenceNumbers[0]);
    console.log(this.state.date.concat(' ').concat(this.state.time));

    if (this.state.errors.date === '' && this.state.errors.time === '') {
      e.preventDefault();
      this.props.conferenceNumbers.forEach(number => {
        axios
          .post(process.env.url + '/conferenceCallAPI.php', {
            a_number: number,
            first_time: this.state.date.concat(' ').concat(this.state.time)
          })
          .then(
            res => {
              console.log(res);
              console.log(res.data);
              window.location.reload(true);
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
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="Date">Date</label>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.date}
                className="form-control"
                placeholder="YYYY-MM-DD"
                name="date"
              />
              {this.state.errors.date ? (
                <small className="form-text text-danger">
                  {this.state.errors.date}
                </small>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="Tine">Time</label>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.time}
                className="form-control"
                placeholder="HH:MM"
                name="time"
              />
              {this.state.errors.time ? (
                <small className="form-text text-danger">
                  {this.state.errors.time}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    conferenceNumbers: state.conference.conferenceNumbers
  };
};

export default connect(mapStateToProps)(AddConferenceCall);
