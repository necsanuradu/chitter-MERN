import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class EditPeep extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    //this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePeepContent = this.onChangePeepContent.bind(this);
    this.onChangePeepTime = this.onChangePeepTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.props = props;

    this.state = {
      user_name: "",
      peep_content: "",
      peep_time: "",
      //peeps: [],
    };
  }
  // This will get the peep based on the id from the database.
  componentDidMount() {
    axios
      .get("https://chitter-mern.herokuapp.com/peep/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          user_name: response.data.user_name,
          peep_content: response.data.peep_content,
          peep_time: response.data.peep_time,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  onChangePeepTime(e) {
    this.setState({
      peep_time: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedpeep = {
      user_name: this.state.user_name,
      peep_content: this.state.peep_content,
      peep_time: this.state.peep_time, //parseInt(new Date().getTime() / 1000)
    };
    console.log(newEditedpeep);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "https://chitter-mern.herokuapp.com/update/" + this.props.match.params.id,
        newEditedpeep
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/"); // this line redirects
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Peep</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Peep: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.peep_content}
              onChange={this.onChangePeepContent}
            />
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Record"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our peeps.

export default withRouter(EditPeep);
