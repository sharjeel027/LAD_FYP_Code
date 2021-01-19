import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import axios from "axios";
import nodataImage from "../../assets/img/nodata.png";
import { MDBDataTableV5 } from "mdbreact";

export default class ReviewComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewTask: [],
      data: {},
      loading: false,
    };
  }

  componentWillMount() {
    var id = localStorage.getItem("user_id");
    axios
      .post("/api/faculty/getbyId", { id: id })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          reviewTask: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await axios
      .post("/api/faculty/getFaculity", { id: this.props.data.userId })
      .then(async (result) => {
        await axios
          .post("/api/faculty/getProgramId", {
            name: result.data.program,
          })
          .then(async (result) => {
            await axios
              .post("/api/student/getFeedback", { id: result.data })
              .then((result) => {
                let column = [
                  {
                    label: "#",
                    field: "no",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "#",
                    },
                  },
                  {
                    label: "Comment",
                    field: "name",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Comment",
                    },
                  },
                  {
                    label: "Name of student",
                    field: "sname",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Name of student",
                    },
                  },
                ];
                console.log(result.data);
                let data = [];
                let row = [];
                for (let i = 0; i < result.data.length; i++) {
                  row.push({
                    no: i,
                    name: result.data[i].description,
                    sname: "Anonymous Student",
                  });
                }
                this.setState({ data: { columns: column, rows: row } });
                this.setState({ loading: false });
              });
          });
      });
  }

  truncate(str) {
    return str.length > 30 ? str.substring(0, 30) + "..." : str;
  }

  render() {
    var tasks = this.state.reviewTask.filter(
      (rtask) => rtask.commenents.length !== 0
    );

    return (
      <div>
        <Modal
          isOpen={this.state.success}
          toggle={this.toggleSuccess}
          className={"modal-success " + this.props.className}
        >
          <ModalHeader toggle={this.toggleSuccess}>
            Modal Review Comments
          </ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleSuccess}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#789e8e" }}
          >
            <h3>Review Comments</h3>
          </CardHeader>
          <CardBody>
            {this.state.loading == true ? (
              <div
                className="spinner-border justify-content-center"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={this.state.data}
                proSelect
              />
            )}
            {/* {tasks.length !== 0 ? (
              tasks.map((synopsis, index) => (
                <div
                  className="col-xs-12 col-sm-12 col-md-12 col-lg-12 card"
                  key={index}
                >
                  <div className="card-body">
                    <h4 className="card-title">
                      Synopsis Title: {synopsis.title}
                    </h4>
                    <h5 className="card-text">
                      Student Name:{" "}
                      {(synopsis.student ? synopsis.student.fname : "") +
                        " " +
                        (synopsis.student ? synopsis.student.lname : "")}
                    </h5>
                    <p className="card-text">
                      Student Reg#:{" "}
                      {synopsis.student ? synopsis.student.regNumber : ""}
                    </p>
                    <div
                      hidden={synopsis.commenents.length >= 1 ? false : true}
                    >
                      <h4>Comments By 1st Reviewer</h4>
                      <p
                        style={{
                          color:
                            synopsis.commenents.length >= 1 ? "blue" : "green",
                        }}
                      >
                        {synopsis.commenents.length >= 1
                          ? synopsis.commenents[0].commenents
                          : "Please download the file by clicking the below button"}
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        style={{ marginRight: "10px" }}
                        hidden={
                          synopsis.commenents.length >= 1
                            ? synopsis.commenents[0].filepath
                              ? false
                              : true
                            : true
                        }
                      >
                        <a
                          href={
                            "https://fyp-ssrs.herokuapp.com/" +
                            synopsis.commenents[0].filepath
                          }
                          target="_blank"
                        >
                          <i class="icon-cloud-download"></i>
                        </a>
                      </button>
                    </div>
                    <div
                      hidden={synopsis.commenents.length >= 2 ? false : true}
                    >
                      <h4>Comments By 2nd Reviewer</h4>
                      <p
                        style={{
                          color:
                            synopsis.commenents.length >= 2 ? "blue" : "green",
                        }}
                      >
                        {synopsis.commenents.length >= 2
                          ? synopsis.commenents[1].commenents
                          : "Please download the file by clicking the below button"}
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        style={{ marginRight: "10px" }}
                        hidden={
                          synopsis.commenents.length >= 2
                            ? synopsis.commenents[1].filepath
                              ? false
                              : true
                            : true
                        }
                      >
                        <a
                          href={
                            "https://fyp-ssrs.herokuapp.com/" +
                            synopsis.commenents[1].filepath
                          }
                          target="_blank"
                        >
                          <i class="icon-cloud-download"></i>
                        </a>
                      </button>
                    </div>
                    <div
                      hidden={synopsis.commenents.length >= 3 ? false : true}
                    >
                      <h4>Comments By 3rd Reviewer</h4>
                      <p
                        style={{
                          color:
                            synopsis.commenents.length >= 3 ? "blue" : "green",
                        }}
                      >
                        {synopsis.commenents.length >= 3
                          ? synopsis.commenents[2].commenents
                          : "Please download the file by clicking the below button"}
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        style={{ marginRight: "10px" }}
                        hidden={
                          synopsis.commenents.length >= 3
                            ? synopsis.commenents[2].filepath
                              ? false
                              : true
                            : true
                        }
                      >
                        <a
                          href={
                            "https://fyp-ssrs.herokuapp.com/" +
                            synopsis.commenents[2].filepath
                          }
                          target="_blank"
                        >
                          <i class="icon-cloud-download"></i>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <img src={nodataImage} style={{ marginLeft: "30%" }}></img>
            )} */}
          </CardBody>
        </Card>
      </div>
    );
  }
}
