import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Auth.css';
import * as actions from '../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    submitted: false,
    error: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    let { email, password } = this.state;

    if (!(email && password)) {
      return;
    }

    email = email.concat('@gmail.com');

    this.props.onAuth(email, password);
  };

  render() {
    const { email, password, submitted } = this.state;

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/home" />;
    }

    let form = (
      <div>
        {authRedirect}
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Login Page</h3>
                      <p className="text-muted mb-4">
                        Please enter your username and password
                      </p>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-3">
                          <input
                            value={email}
                            onChange={this.handleChange}
                            name="email"
                            id="inputEmail"
                            type="text"
                            //type="email"
                            placeholder="Username"
                            //placeholder="Email address"
                            required=""
                            autoFocus=""
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                          />
                          {submitted && !email && (
                            <div
                              style={{
                                paddingTop: '8px',
                                color: 'red'
                              }}
                            >
                              Username is required
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <input
                            value={password}
                            onChange={this.handleChange}
                            name="password"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            required=""
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                          />
                          {submitted && !password && (
                            <div style={{ paddingTop: '8px', color: 'red' }}>
                              Password is required
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Sign in
                        </button>
                        {errorMessage && (
                          <div
                            style={{
                              paddingTop: '8px',
                              color: 'red',
                              fontSize: 'small',
                              textAlign: 'center'
                            }}
                          >
                            {errorMessage}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return <div>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
