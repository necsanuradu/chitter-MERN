// import Card from "react-bootstrap/Card";
import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";
import { timeAgo } from "./helper";

const EditDelete = (props) => {
  return (
    props.userName !== "" &&
    props.userName === props.peepUserName && (
      <div className="w-100 text-end m-b-0 pb-0">
        <Link to={"/edit/" + props.currentPeepId} className="text-muted">
          Edit
        </Link>{" "}
        |&nbsp;
        <a
          href="/"
          className="text-muted"
          onClick={() => {
            props.deletePeep(props.currentPeepId);
          }}
        >
          Delete
        </a>
      </div>
    )
  );
};

export default class PeepList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);

    this.props = props;

    this.deletePeep = this.deletePeep.bind(this);
    this.state = {
      peeps: [],
      peepsReload: this.props.peepsReload,
      user_name: this.props.userName,
    };
  }

  componentDidUpdate(prevProps) {
    //Typical usage, don't forget to compare the props
    if (this.props.peepsReload !== prevProps.peepsReload) {
      this.getPeeps();
    }
    if (prevProps.userName !== this.props.userName) {
      this.setUserNameState();
    }
  }

  setUserNameState() {
    this.setState({
      user_name: this.props.userName,
    });
  }

  // This method will get the data from the database.
  componentDidMount() {
    this.getPeeps();
    setInterval(() => {
      this.getPeeps(0);
    }, 60000);
  }

  getPeeps() {
    axios
      .get("http://localhost:5000/peep/")
      .then((response) => {
        this.setState({ peeps: response.data.reverse() });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a peep based on the method
  deletePeep(id) {
    axios.delete("https://chitter-mern.herokuapp.com/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      peep: this.state.peeps.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  peepList() {
    return this.state.peeps.map((currentpeep, key) => {
      return (
        <div className="card mt-2" key={key}>
          <div className="card-header pb-0">
            <div className="card-title row">
              <div className="col-6 text-start">
                <i className="text-muted font-italic d-inline h5">@ </i>
                {currentpeep.user_name}
              </div>
              <div className="col-6 text-end text-muted">
                {timeAgo(currentpeep.peep_time)}
              </div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ textIndent: "2rem" }}>
              <i className="text-muted font-italic d-inline"># </i>
              <div className="d-inline">{currentpeep.peep_content}</div>
            </div>
            <EditDelete
              currentPeepId={currentpeep._id}
              userName={this.state.user_name}
              peepUserName={currentpeep.user_name}
              deletePeep={this.deletePeep}
            />
          </div>
        </div>
      );
    });
  }

  // This following section will display the table with the peeps of individuals.
  render() {
    return <div className="pb-5">{this.peepList()}</div>;
  }
}
