import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";

const User = (props) => (
  <tr>
    <td>{props.user.user_name}</td>
    <td>{props.user.user_password}</td>
    <td>
      <Link to={"/edit/" + props.user._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class userList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("https://chitter-mern.herokuapp.com:5000/users")
      .then((response) => {
        this.setState({ users: response.data });
        // console.log(this.state.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a user based on the method
  deleteUser(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      user: this.state.users.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  userList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  // This following section will display the table with the users of individuals.
  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}
