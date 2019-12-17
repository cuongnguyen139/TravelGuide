import React from 'react';

class EditName extends React.Component {
  state = {
    id: '',
    name: '',
    error: null,
    errors: {
      name: ''
    }
  };

  onChangeName = e => {
    if (this.state.errors.name !== '') {
      this.setState({
        errors: {
          name: ''
        }
      });
    }
    this.setState({ name: e.target.value });
  };

  postDataHandler = e => {
    const name = this.state.name;

    if (name === '') {
      e.preventDefault();
      this.setState({
        errors: { name: 'Name is required' }
      });
      return;
    }

    fetch(process.env.url + '/editNumber.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        id: this.props.id,
        name: this.state.name
      })
    }).catch(error => this.setState({ error }));
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                onChange={this.onChangeName}
                type="text"
                value={this.state.name}
                className="form-control"
                placeholder="Enter a new name"
                name="name"
              />
              {this.state.errors.name ? (
                <small className="form-text text-danger">
                  {this.state.errors.name}
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

export default EditName;
