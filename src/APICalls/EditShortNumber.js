import React from 'react';

class EditShortNumber extends React.Component {
  state = {
    id: '',
    short_number: '',
    error: null,
    errors: {
      short_number: ''
    }
  };

  onChangeShortNumber = e => {
    if (this.state.errors.short_number !== '') {
      this.setState({
        errors: {
          short_number: ''
        }
      });
    }
    this.setState({ short_number: e.target.value });
  };

  postDataHandler = e => {
    const short_number = this.state.short_number;

    if (short_number === '') {
      e.preventDefault();
      this.setState({
        errors: { short_number: 'Short number is required' }
      });
      return;
    }

    if (short_number === '99') {
      e.preventDefault();
      this.setState({
        errors: { short_number: '99 is reserved for conference number' }
      });
      return;
    }

    if (!short_number.match(/^\d{2}$/)) {
      e.preventDefault();
      this.setState({
        errors: { short_number: 'Must have two digits' }
      });
      return;
    }
    if (short_number === '') {
      e.preventDefault();
      this.setState({
        errors: { short_number: 'short_number is required' }
      });
      return;
    }

    fetch(process.env.url + '/removeShortNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        short_number: this.props.short_number
      })
    }).catch(error => this.setState({ error }));

    fetch(process.env.url + '/addOrUpdateShortNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id,
        short_number: this.state.short_number
      })
    }).catch(error => this.setState({ error }));
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="ShortNumber">New Short Number</label>
              <input
                onChange={this.onChangeShortNumber}
                type="text"
                value={this.state.short_number}
                className="form-control"
                placeholder="Enter a new short number"
                name="short_number"
              />
              {this.state.errors.short_number ? (
                <small className="form-text text-danger">
                  {this.state.errors.short_number}
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

export default EditShortNumber;
