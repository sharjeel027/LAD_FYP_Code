import React, { Component } from "react";
import download from "downloadjs";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Progress,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { MDBDataTableV5 } from "mdbreact";

class RecivedAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programId: "",
      filesList: [],
      errorMsg: "",
      data: {},
      loading: false,
    };
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
            this.setState({ programId: result.data });

            await axios
              .post("/api/file/getAllFiles/Recive", { id: result.data })
              .then(async (result) => {
                console.log(result.data);

                let column = [
                  {
                    label: "Student email",
                    field: "fname",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Student email",
                    },
                  },
                  {
                    label: "Assign Title",
                    field: "lname",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Assign Title",
                    },
                  },
                  {
                    label: "Submitted date",
                    field: "fathername",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Submitted date",
                    },
                  },
                  {
                    label: "Download",
                    field: "email",
                    width: 150,
                    attributes: {
                      "aria-controls": "DataTable",
                      "aria-label": "Download",
                    },
                  },
                ];

                let data = [];
                let row = [];
                console.log("my name ", result.data);
                for (let i = 0; i < result.data.length; i++) {
                  let title = "";
                  await axios
                    .get(`/api/file/detail/${result.data[i].assignId}`)
                    .then((result) => {
                      console.log("data ", result.data.title);
                      title = result.data.title;
                    });
                  row.push({
                    fname: result.data[i].email,
                    lname: title,
                    fathername: result.data[i].createdAt,
                    email: (
                      <a
                        onClick={() =>
                          this.downloadFile(
                            result.data[i]._id,
                            result.data[i].file_path,
                            result.data[i].file_mimetype
                          )
                        }
                        style={{ color: "blue" }}
                      >
                        Download
                      </a>
                    ),
                  });
                }

                console.log("hello ", row);
                this.setState({ data: { columns: column, rows: row } });
                this.setState({ loading: false });
                this.setState({ errorMsg: "" });
                this.setState({ filesList: result.data });
              })
              .catch((e) => {
                console.log("error ", e);
                this.setState({ errorMsg: e });
              });
          });
      });

    await axios
      .post("/api/faculty/getFaculity", { id: this.props.data.userId })
      .then(async (result) => {
        this.setState({
          programId: result.data.program,
          studentid: result.data._id,
          email: this.props.data.email,
        });
      });
  }

  downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/api/file/download/recive/${id}`, {
        responseType: "blob",
      });

      const split = path.split("/");
      const filename = split[split.length - 1];
      this.setState({ errorMsg: "" });
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({
          errorMsg: "Error while downloading file. Try again later",
        });
      }
    }
  };
  render() {
    return (
      <div>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#7d6a82" }}
          >
            <h3>Assignments Recived</h3>
          </CardHeader>
          <CardBody>
            {/* <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">title</th>
                  <th scope="col">Description</th>
                  <th scope="col">due date</th>
                  <th scope="col">created at</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filesList.length > 0 ? (
                  this.state.filesList.map(
                    ({
                      _id,
                      title,
                      description,
                      file_path,
                      file_mimetype,
                      createdAt,
                      dueDate,
                    }) => (
                      <tr key={_id}>
                        <td className="file-title">{title}</td>
                        <td className="file-description">{description}</td>
                        <td className="file-due">{dueDate}</td>
                        <td className="file-created">{createdAt}</td>
                        <td>
                          <a
                            href="#/"
                            style={{ color: "blue" }}
                            onClick={() =>
                              this.downloadFile(_id, file_path, file_mimetype)
                            }
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3} style={{ fontWeight: "300" }}>
                      There are no assignemt assigned by instructor
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}

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
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default RecivedAssign;
