import React, { Component } from "react";
import axios from "axios";

class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  async componentDidMount() {
    await axios
      .post("/api/student/getuserinfo", { email: this.props.data.user.email })
      .then(async (result) => {
        await axios
          .post("/api/link/getLink", { programId: result.data.program })
          .then((result) => {
            if (result.data.length == 0) {
              this.setState({ url: "" });
            } else {
              this.setState({ url: result.data[0].link });
            }
          });
      });
  }
  render() {
    return (
      <div
        className="justify-content-center"
        style={{ alignItems: "center", marginTop: 20 }}
      >
        {this.state.url == "" ? (
          <h5 className="btn btn-primary d-flex justify-content-center">
            there is no lecture today
          </h5>
        ) : (
          <a
            className="btn btn-primary d-flex justify-content-center"
            target="_blank"
            href={this.state.url}
          >
            Open Go live
          </a>
        )}
      </div>
    );
  }
}

export default LiveLecture;
