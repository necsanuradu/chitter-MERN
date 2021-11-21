import React, { Component } from "react";
// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./navbar";
import EditPeep from "./editPeep";
import CreatePeep from "./createPeep";
import PeepList from "./peepList";
import CreateUser from "./createUser";
import UserList from "./userList";

import Session from "react-session-api";
Session.config({ browserStorage: false, timeout: 0 });

export default class MainContainer extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.setLogginState = this.setLogginState.bind(this);
    this.setPeepsState = this.setPeepsState.bind(this);

    this.state = {
      user_loggedIn: Session.get("loggedIn"),
      peepsReload: false,
      user_name: Session.get("userName"),
    };

    Session.set("peepsReload", "false");
  }

  componentDidMount() {
    Session.onSet((data) => {
      if (this.state.user_loggedIn !== data.loggedIn) this.setLogginState();
      if (this.state.peepsReload !== data.peepsReload) this.setPeepsState();
      if (this.state.user_name !== data.userName) this.setUserNameState();
    });
  }

  componentWillUnmount() {
    //Session.unmount();
  }

  setUserNameState() {
    this.setState({ user_name: Session.get("userName") });
  }

  // These methods will update the state properties.
  setLogginState() {
    this.setState({ user_loggedIn: Session.get("loggedIn") }, this.checkUpdate);
  }

  setPeepsState() {
    this.setState({ peepsReload: Session.get("peepsReload") });
  }

  checkUpdate() {
    //alert(this.state.user_loggedIn);
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div className="container">
        <Navbar userLoogedIn={this.state.user_loggedIn} />
        <Route path="/edit/:id" component={EditPeep} />
        <Route exact path="/">
          <CreatePeep userLoogedIn={this.state.user_loggedIn} />
        </Route>
        <Route exact path="/">
          <PeepList
            peepsReload={this.state.peepsReload}
            userName={this.state.user_name}
          />
        </Route>
        <Route path="/register">
          <CreateUser />
        </Route>
        <Route exact path="/register/368789hjf93j8gf7hjoiby89">
          <UserList />
        </Route>
      </div>
    );
  }
}
