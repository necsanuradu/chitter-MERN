import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import Session from "react-session-api";

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
      peep_content: this.state.peep_content,
      peep_time: parseInt(new Date().getTime() / 1000),
    };

    axios.post("http://chitter-mern.herokuapp.com/peep/add", newperson).then((res) => {
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
        <div>
          <form onSubmit={this.onSubmit} className="row">
            <div className="form-group col-12 col-md-11">
              <textarea
                type="text"
                className="form-control"
                value={this.state.peep_content}
                onChange={this.onChangePeepContent}
                placeholder="What's on your mind.."
                rows="2"
                style={{ resize: "none" }}
                required
              />
            </div>
            <div className="col-12 col-md-auto form-group d-inline-block mt-2 mb-0 float-end">
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
