import Axios from "axios";
import React, { Component } from "react";

class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = { desc: "" };
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
  }

  componentDidMount() {
    console.log("hello ", this.props.data);
  }
  handleInputUrl = (event) => {
    this.setState({ desc: event.target.value });
  };

  handleLinkAdd = async () => {
    if (this.state.desc == "") {
      alert("please fill field first");
    } else {
      await Axios.post("/api/student/getSID", {
        id: this.props.data.userId,
      })
        .then(async (result) => {
          let programId = result.data;
          console.log("hello ", programId);
          await Axios.post("/api/faculty/getProgramName", {
            id: programId,
          }).then(async (result) => {
            console.log("hello ", result.data);

            await Axios.post("/api/faculty/getFaculityPro", {
              name: result.data,
            }).then(async (result) => {
              let faculityid = result.data;
              await Axios.post("/api/student/givefeedback", {
                programId: programId,
                faculityId: faculityid,
                description: this.state.desc,
              }).then((result) => {
                alert("added successfully");
              });
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  render() {
    return (
      <div>
        <form
          className=" justify-content-center"
          style={{ marginTop: 50, marginLeft: 80 }}
        >
          <div className="form-group ">
            <label for="exampleFormControlTextarea1">Review</label>
            <textarea
              class="form-control rounded-0"
              id="exampleFormControlTextarea1"
              rows="10"
              style={{ width: 500 }}
              onChange={this.handleInputUrl}
            ></textarea>
          </div>
        </form>
        <button onClick={this.handleLinkAdd} className="btn btn-primary mb-2">
          Send
        </button>
      </div>
    );
  }
}

export default Feedbacks;
