import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { NavLink } from "react-router-dom";
// import ReactSession from 'react-client-session';
import Session from "react-session-api";
Session.config({ browserStorage: false, timeout: 0 });

export default class userLogin extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onInputUserName = this.onInputUserName.bind(this);
    this.onInputUserPassword = this.onInputUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      // this.fetchData(this.props.userName);
      this.setState({
        user_loggedIn: this.props.userLoogedIn,
      });
    }
  }

  // These methods will update the state properties.
  onInputUserName(e) {
    this.setState({
      user_name: e.target.value,
    });
  }

  onInputUserPassword(e) {
    this.setState({
      user_password: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newuser) to the database.
    const userLogin = {
      user_name: this.state.user_name,
      user_password: this.state.user_password,
    };

    axios.post("https://chitter-mern.herokuapp.com/user/signin", userLogin).then((res) => {
      if (
        typeof res.data === "object" &&
        res.data !== null &&
        Object.keys(res.data).indexOf("user_name") >= 0
      ) {
        Session.set("userName", userLogin.user_name);
        Session.set("loggedIn", "true");
      } else {
        Session.set("");
        Session.set("loggedIn", "false");
      }
    });

    // We will empty the state after posting the data to the database
    this.setState({
      user_name: "",
      user_password: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      this.state.user_loggedIn !== "true" && (
        <div className="col-12 col-md-6 m-0 p-0">
          <form onSubmit={this.onSubmit} className="container m-0 p-0 text-end">
            <div className="col-12 col-md-3 mt-1 mt-md-0 form-group d-inline-block me-md-1">
              <input
                type="text"
                className="form-control"
                value={this.state.user_name}
                onChange={this.onInputUserName}
                placeholder="username"
                required
              />
            </div>
            <div className="col-12 col-md-3 mt-1 mt-md-0 form-group d-inline-block me-md-1">
              <input
                type="password"
                className="form-control"
                value={this.state.user_password}
                onChange={this.onInputUserPassword}
                placeholder="password"
                required
              />
            </div>
            <div className="col-12 col-md-2 mt-1 mt-md-0 form-group d-inline-block me-md-1">
              <input
                type="submit"
                value="Login"
                className="btn-primary form-control"
              />
            </div>
            <NavLink
              className="col-12 col-md-3 mt-1 mt-md-0 form-group d-inline-block"
              to="/register"
            >
              <input
                type="button"
                value="Register"
                className="btn-secondary form-control"
                style={{ textDecoration: "underline #6c757d" }}
              />
            </NavLink>
          </form>
        </div>
      )
    );
  }
}
