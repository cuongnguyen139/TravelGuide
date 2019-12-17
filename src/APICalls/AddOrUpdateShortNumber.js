import React from 'react';

class AddOrUpdateShortNumber extends React.Component {
  state = {
    value: 'select',
    id: '',
    short_number: '',
    error: null,
    errors: {
      value: '',
      short_number: ''
    }
  };

  onChangeValue = e => {
    if (this.state.errors.value !== '') {
      this.setState({
        errors: {
          value: ''
        }
      });
    }

    this.setState({
      value: e.target.value,
      id: e.target.options[e.target.selectedIndex].getAttribute('id')
    });
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
    const value = this.state.value;
    const short_number = this.state.short_number;

    if (value === 'select') {
      e.preventDefault();
      this.setState({
        errors: { value: 'Please select a number' }
      });
      return;
    }

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

    fetch(process.env.url + '/addOrUpdateShortNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        short_number: this.state.short_number
      })
    }).catch(error => this.setState({ error }));
  };

  render() {
    const modifedData = [...this.props.data];
    const filtered = Object.values(
      modifedData.reduce((a, c) => {
        a[c.number] = c;
        return a;
      }, {})
    );
    const numbers = filtered.map(number => {
      if (number.number !== '35834439430' && number.number !== '35834439431') {
        return (
          <option key={number.id} id={number.id} value={number.number}>
            {number.info}
          </option>
        );
      } else return null;
    });

    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <div style={{ marginBottom: '10px' }}>
                <strong>Name</strong>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <select onChange={this.onChangeValue}>
                  <option value="select">Select a name</option>
                  {numbers}
                </select>
                {this.state.errors.value ? (
                  <small className="form-text text-danger">
                    {this.state.errors.value}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="public_number">Short Number</label>
              <input
                onChange={this.onChangeShortNumber}
                type="text"
                value={this.state.short_number}
                className="form-control"
                placeholder="Enter a short Number"
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
export default AddOrUpdateShortNumber;
