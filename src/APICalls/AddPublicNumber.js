import React from 'react';

class AddPublicNumber extends React.Component {
  state = {
    public_number: '',
    name: '',
    error: null,
    errors: {
      public_number: '',
      name: ''
    }
  };

  onChange = e => {
    if (
      this.state.errors.name !== '' ||
      this.state.errors.public_number !== ''
    ) {
      this.setState({
        errors: {
          name: '',
          public_number: ''
        }
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postDataHandler = e => {
    if (this.state.name === '' && this.state.public_number === '') {
      e.preventDefault();
      this.setState({
        errors: {
          name: 'Name is required',
          public_number: 'Phone number is required'
        }
      });
      return;
    }

    if (this.state.name === '') {
      e.preventDefault();
      this.setState({
        errors: { name: 'Name is required' }
      });
      return;
    }

    if (this.state.public_number === '') {
      e.preventDefault();
      this.setState({
        errors: { public_number: 'Phone number is required' }
      });
      return;
    }

    //if (!this.state.public_number.match(/^\d{12}$/) && !this.state.public_number.match(/^\d{13}$/)) {
    if (!/^[3][5][8][0-9]/.test(this.state.public_number)) {
      e.preventDefault();
      this.setState({
        errors: { public_number: 'Invalid, must start with 358' }
      });
      return;
    }

    console.log(this.state.errors.public_number);
    console.log(this.state.errors.name);
    console.log(this.state.public_number);
    console.log(this.state.name);
    if (
      this.state.errors.public_number === '' &&
      this.state.errors.name === ''
    ) {
      fetch(process.env.url + '/addPublicNumber.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          public_number: this.state.public_number
        })
      }).catch(error => this.setState({ error }));
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
              <label htmlFor="Name">Name</label>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.name}
                className="form-control"
                placeholder="Enter Your Name"
                name="name"
              />
              {this.state.errors.name ? (
                <small className="form-text text-danger">
                  {this.state.errors.name}
                </small>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="public_number">Phone Number</label>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.public_number}
                className="form-control"
                placeholder="Enter Your Phone Number"
                name="public_number"
              />
              {this.state.errors.public_number ? (
                <small className="form-text text-danger">
                  {this.state.errors.public_number}
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

export default AddPublicNumber;
