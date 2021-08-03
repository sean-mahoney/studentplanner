import React from "react";
import Axios from "axios"; //import axios
import { Link } from "react-router-dom";

class StudyDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Plans: [],
      currentUser: window.localStorage.currentuser,
    };
  }
  componentDidMount() {
    Axios.post(`http://localhost:3001/getPlans`, {
      user: this.state.currentUser,
    }).then((response) => {
      this.setState({ Plans: response.data });
      console.log(response.data);
    });
  }
  render() {
    if (!this.state.Plans.length > 0) {
      return (
        <div className="ToDoDash">
          <Link to="/StudyPlans">
            <h2>Study Plans</h2>
            <p>
              <em>No Plans to Show.</em> Click here to create some
            </p>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="ToDoDash">
          <Link to="/StudyPlans">
            <h2>Study Plans</h2>
            <div className="ToDoDash-lists">
              {this.state.Plans.map((val, key) => {
                return (
                  <div>
                    <p>{val.plan}</p>
                  </div>
                );
              })}
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default StudyDash;
