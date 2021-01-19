import React, { Component } from "react";
import AuthService from "../AuthTest";
import axios from "axios";
import { Card, CardBody, CardHeader, Progress } from "reactstrap";
import nodataImage from "../../assets/img/nodata.png";
const Auth = new AuthService();
class GoLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      flag: false,
      programId: "",
      linkData: [],
      dataflag: false,
    };
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
  }

  async componentDidMount() {
    await axios
      .post("/api/faculty/getFaculity", { id: this.props.data.userId })
      .then(async (result) => {
        await axios
          .post("/api/faculty/getProgramId", {
            name: result.data.program,
          })
          .then(async (result) => {
            this.setState({ programId: result.data });

            console.log("hello ", result.data);
            await axios

              .post("/api/link/getAllLink", { id: result.data })
              .then((result) => {
                console.log(result.data);
                if (result.data.length >= 1) {
                  this.setState({ dataflag: true });
                }
                this.setState({ linkData: result.data });
              })
              .catch((e) => {
                console.log(e);
              });
          });
      });

    console.log("hello ", this.props.data);
  }
  handleInputUrl = (event) => {
    this.setState({ url: event.target.value });
  };

  handleLinkAdd = async () => {
    if (this.state.dataflag == true) {
      alert("please delete previous links to make new link");
    } else {
      await axios
        .post("/api/link/addlink", {
          email: this.props.data.email,
          programId: this.state.programId,
          url: this.state.url,
        })
        .then((result) => {
          if (result.data == "complete") {
            alert("the send is sent to students wait for their joining");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  deleteFaculty(id) {
    return async function () {
      await axios.post("/api/link/delLink", { id: id }).then((result) => {
        alert("link deleted");

        window.location.reload(false);
      });
    };
  }
  render() {
    const facultylistItem = this.state.linkData.map((facultymember, index) => (
      <tr scope="row" key={index}>
        <td>{index}</td>
        <td>{facultymember.email}</td>
        <td>{facultymember.link}</td>
        <td>{facultymember.createdAt}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={this.deleteFaculty(facultymember._id)}
          >
            <i class="icon-trash"></i>
          </button>
        </td>
      </tr>
    ));

    return (
      <div
        className="justify-content-center"
        style={{ alignItems: "center", marginTop: 20 }}
      >
        <a
          className="btn btn-primary d-flex justify-content-center"
          target="_blank"
          href="http://localhost:2000/"
        >
          Open Go live
        </a>
        <form
          className="form-inline justify-content-center"
          style={{ marginTop: 50 }}
        >
          <div className="form-group mb-2">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail2"
              defaultValue="Enter the meeting url "
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="URL"
              onChange={this.handleInputUrl}
            />
          </div>
          <button
            type="submit"
            onClick={this.handleLinkAdd}
            className="btn btn-primary mb-2"
          >
            Send
          </button>
        </form>

        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#378686" }}
          >
            <h3>Delete the Current meeting links</h3>
          </CardHeader>
          <CardBody>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">email</th>
                  <th scope="col">Link</th>
                  <th scope="col">timestamp</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">Status</th> */}
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {facultylistItem.length !== 0 ? (
                  facultylistItem
                ) : (
                  <tr>
                    <td>
                      <img src={nodataImage}></img>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default GoLive;
