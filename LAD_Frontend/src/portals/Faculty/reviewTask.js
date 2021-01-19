import React, { Component, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Progress } from "reactstrap";
import axios from "axios";
import nodataImage from "../../assets/img/nodata.png";
import Dropzone from "react-dropzone";
import { Form, Row, Col, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

export default class ReviewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewTask: [],
      title: "",
      description: "",
      isPreviewAvailable: false,
      errorMsg: "",
      previewSrc: "",
      file: null,
      programId: "",
      date: new Date(),
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateBorder = this.updateBorder.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
          });
      });

    console.log("hello ", this.props.data);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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

  updateBorder = (dragState) => {
    if (dragState === "over") {
    } else if (dragState === "leave") {
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = this.state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (this.state.file) {
          const formData = new FormData();
          formData.append("id", this.state.programId);
          formData.append("file", this.state.file);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("due", this.state.date);

          this.setState({ errorMsg: "" });
          await axios.post("/api/file/upload", formData, {}).then((result) => {
            alert("assiignemt added successfully");
            window.location.reload(false);
          });
        } else {
          this.setState({ errorMsg: "Please select a file to add." });
        }
      } else {
        this.setState({ errorMsg: "Please enter all the field values." });
      }
    } catch (error) {
      error.response && this.setState({ errorMsg: error.response.data });
    }
  };

  render() {
    return (
      <div>
        <Form className="search-form" style={{ marginLeft: 20, marginTop: 30 }}>
          {this.state.errorMsg && (
            <p className="errorMsg">{this.state.errorMsg}</p>
          )}
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title || ""}
                  placeholder="Enter title"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Control
                  type="text"
                  name="description"
                  value={this.state.description || ""}
                  placeholder="Enter description"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="date">
                <DateTimePicker
                  onChange={(value) => {
                    this.setState({ date: value });
                  }}
                  value={this.state.date}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <div className="upload-section">
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
            {this.state.previewSrc ? (
              this.state.isPreviewAvailable ? (
                <div className="image-preview">
                  <img
                    className="preview-image"
                    src={this.state.previewSrc}
                    alt="Preview"
                  />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )}
          </div>

          <Button onClick={this.handleOnSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}
