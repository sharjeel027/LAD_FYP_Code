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
class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      errorMsg: "",
      title: "",
      description: "",
      isPreviewAvailable: false,
      errorsMsg: "",
      previewSrc: "",
      file: null,
      programId: "",
      date: new Date(),
      assignid: "",
      studentid: "",
      email: "",
    };
  }

  async componentDidMount() {
    await axios
      .post("/api/student/getuserinfo", { email: this.props.data.email })
      .then(async (result) => {
        this.setState({
          programId: result.data.program,
          studentid: result.data._id,
          email: this.props.data.email,
        });
        await axios
          .post("/api/file/getAllFiles", { id: result.data.program })
          .then((result) => {
            console.log(result.data);
            this.setState({ errorMsg: "" });
            this.setState({ filesList: result.data });
          })
          .catch((e) => {
            this.setState({ errorMsg: e });
          });
      });
  }

  onDrop = (files) => {
    const [uploadedFile] = files;
    this.setState({ file: uploadedFile });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState({ previewSrc: fileReader.result });
    };
    fileReader.readAsDataURL(uploadedFile);
    this.setState({
      isPreviewAvailable: uploadedFile.name.match(/\.(jpeg|jpg|png)$/),
    });
  };

  onChange = (event) => {
    this.setState({ assignid: event.target.value });
  };

  updateBorder = (dragState) => {
    if (dragState === "over") {
    } else if (dragState === "leave") {
    }
  };
  downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/api/file/download/${id}`, {
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

  handleOnSubmit = async (event) => {
    event.preventDefault();
    if (this.state.assignid == "" || this.state.file == null) {
      alert("please select assignemnt or upload it in field first");
    } else {
      try {
        if (this.state.file) {
          const formData = new FormData();
          formData.append("id", this.state.programId);
          formData.append("file", this.state.file);
          formData.append("email", this.state.email);
          formData.append("sid", this.state.studentid);
          formData.append("asid", this.state.assignid);

          this.setState({ errorMsg: "" });
          await axios
            .post("/api/file/upload/Assign", formData, {})
            .then((result) => {
              alert("assiignemt added successfully");
              window.location.reload(false);
            });
        } else {
          this.setState({ errorMsg: "Please select a file to add." });
        }
      } catch (error) {
        error.response && this.setState({ errorMsg: error.response.data });
      }
    }
  };
  render() {
    const DeptOptions = this.state.filesList.map((dept, index) => (
      <option key={index} value={dept._id}>
        {dept.title}
      </option>
    ));
    return (
      <div>
        <div className="files-container">
          {this.state.errorMsg && (
            <p className="errorMsg">{this.state.errorMsg}</p>
          )}

          <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
            <CardHeader
              style={{ textAlign: "center", backgroundColor: "#7d6a82" }}
            >
              <h3>Assignments </h3>
            </CardHeader>
            <CardBody>
              <table class="table">
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
              </table>
            </CardBody>
          </Card>

          <div>
            <form
              className="form-inline "
              style={{ marginTop: 50, marginLeft: 12 }}
            >
              <Input
                type="select"
                name="fdept"
                id="dept"
                bsSize="lg"
                onChange={this.onChange}
              >
                <option>Select Assignment</option>
                {DeptOptions}
              </Input>

              <Dropzone
                onDrop={this.onDrop}
                onDragEnter={() => this.updateBorder("over")}
                onDragLeave={() => this.updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "drop-zone" })}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {this.state.file && (
                      <div>
                        <strong>Selected file:</strong> {this.state.file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>

              <button
                className="btn btn-primary mb-2"
                onClick={this.handleOnSubmit}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Assignment;
