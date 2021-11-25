import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import Session from "react-session-api";
import { scroolIntoView } from "./helper";

export default class CreatePeep extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePeepContent = this.onChangePeepContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.props = props;

    this.state = {
      user_name: "",
      peep_content: "",
      peep_time: "",
      user_loggedIn: this.props.userLoogedIn,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userLoogedIn !== this.props.userLoogedIn) {
      this.setLogginState();
    }
  }

  setLogginState() {
    this.setState({ user_loggedIn: Session.get("loggedIn") }, this.checkUpdate);
  }

  // These methods will update the state properties.
  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value,
    });
  }

  onChangePeepContent(e) {
    this.setState({
      peep_content: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    // When post request is sent to the create url, axios will add a new peep(newperson) to the database.
    const newperson = {
      user_name: Session.get("userName"),
      peep_content: this.state.peep_content.toString().substr(0, 125),
      peep_time: parseInt(new Date().getTime() / 1000),
    };

    axios
      .post("https://chitter-mern.herokuapp.com/peep/add", newperson)
      .then((res) => {
        Session.set("peepsReload", parseInt(new Date().getTime() / 100));
        // console.log(res.data);
      });

    // We will empty the state after posting the data to the database
    this.setState({
      user_name: "",
      peep_content: "",
      peep_time: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      this.state.user_loggedIn === "true" && (
        <div className="sticky-container pt-1 mt-1">
          <form
            onSubmit={this.onSubmit}
            className="row position-relative form-shadow"
          >
            <div className="form-group col-12">
              <textarea
                type="text"
                className="form-control pe-lg-5"
                value={this.state.peep_content}
                onChange={this.onChangePeepContent}
                placeholder="What's on your mind.."
                rows="2"
                style={{ resize: "none" }}
                required
                maxLength="125"
              />
            </div>
            <div
              className="col-12 col-lg-auto form-group d-inline-block mt-1 py-2 mb-0 me-2 position-lg-absolute  end-0" 
              onClick={scroolIntoView}
            >
              <input
                type="submit"
                value="Peep"
                className="btn-secondary form-control px-md-2"
              />
            </div>
          </form>
        </div>
      )
    );
  }
}
