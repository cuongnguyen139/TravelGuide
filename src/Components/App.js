import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Auth from "../Auth/Auth";
import HomePage from "./HomePage";
import Logout from "../Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class App extends React.Component {
  state = {};
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Auth} />
        </Switch>
      );
    }

    return <div>{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
