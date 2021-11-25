//import React from "react";
import React, { Component } from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink, Route } from "react-router-dom";
import UserLogin from "./userLogin";
import Session from "react-session-api";

const logout = () => {
  if (Session.get("loggedIn") === "true") {
    Session.set("loggedIn", "false");
    Session.set("userName", "");
  }
};

export default class Navbar extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      user_name: "",
      user_password: "",
      user_loggedIn: this.props.userLoogedIn,
    };
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if (this.props.userLoogedIn !== prevProps.userLoogedIn) {
      this.setState({
        user_loggedIn: this.props.userLoogedIn,
      });
    }
  }

  // Here, we display our Navbar
  render() {
    return (
      <div className="row" data-logstate={this.state.user_loggedIn}>
        <nav className="navbar navbar-expand-lg navbar-light mt-1 pb-1">
          <NavLink className="navbar-brand" to="/">
            <i className="ms-2 h5">
              <div className="text-muted d-inline h5">C</div>
              <div className="d-inline h4">hi</div>
              <div className="text-muted d-inline h5">tter</div>
            </i>
          </NavLink>
          <button
            className="navbar-toggler d-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-none">
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Create Post
                </NavLink>
              </li>
            </ul>
          </div>
          <Route exact path="/">
            <UserLogin userLoogedIn={this.state.user_loggedIn} />
            {this.state.user_loggedIn === "true" ? (
              <div className="col-3 col-md-2 mt-1 mt-md-0 form-group d-inline-block">
                <button
                  onClick={logout}
                  className="btn-light form-control logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              ""
            )}
          </Route>
          <Route exact path="/register">
            <NavLink className="nav-link" to="/">
              Back
            </NavLink>
          </Route>
        </nav>
      </div>
    );
  }
}
//export default Navbar;
