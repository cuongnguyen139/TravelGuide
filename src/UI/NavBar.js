import React from "react";
import Logo from "../assets/logo_2_vari.png";
import { connect } from "react-redux";

class NavBar extends React.Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    let menu = null;
    if (this.props.isAuthenticated) {
      return (menu = (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
          <a className="navbar-brand" href="/travel-guide/home">
            <img alt="Logo" width="80" height="30" src={Logo} />
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li
                className={
                  this.state.activeItem === "home"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a
                  className="nav-link"
                  href="/travel-guide/home"
                  name="home"
                  onClick={this.handleItemClick}
                >
                  Home
                </a>
              </li>
              <li
                className={
                  this.state.activeItem === "logout"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a
                  className="nav-link"
                  href="/travel-guide/logout"
                  name="logout"
                  onClick={this.handleItemClick}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ));
    }
    return { menu };
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(NavBar);
