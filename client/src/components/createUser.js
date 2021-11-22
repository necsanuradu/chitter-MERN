import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";

export default class CreateUser extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_name: "",
      user_password: "",
      userCreateteSolution: "",
    };
  }

  // These methods will update the state properties.
  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
    });
  }

  onChangeUserPassword(e) {
    this.setState({
      user_password: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newuser) to the database.
    const newuser = {
      user_name: this.state.user_name,
      user_password: this.state.user_password,
    };

    axios.post("http://localhost:5000/user/add", newuser).then((res) => {
      if (Object.keys(res.data).length === 0) {
        this.setState({
          userCreateteSolution: "Username already exists",
        });
      } else {
        this.setState({
          userCreateteSolution: "User created",
        });
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
      <div id="create-user" className="mt-0 col-12 col-md-6 offset-md-3">
        <h5>Create New User</h5>
        <h4 className="text-center">{this.state.userCreateteSolution}</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.user_name}
              onChange={this.onChangeUserName}
              required
            />
          </div>
          <div className="form-group">
            <label> Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.user_password}
              onChange={this.onChangeUserPassword}
              required
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="submit"
              value="Create user"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    );
  }
}
