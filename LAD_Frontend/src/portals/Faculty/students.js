import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import { getStudent } from "../../redux/Faculty/FacultyAction";
import nodataImage from "../../assets/img/nodata.png";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Axios from "axios";
import { MDBDataTableV5 } from "mdbreact";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      data: {},
      loading: false,
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    console.log("hello", this.props.data.userId);
    await Axios.post("/api/faculty/getFaculity", {
      id: this.props.data.userId,
    }).then(async (result) => {
      await Axios.post("/api/faculty/getProgramId", {
        name: result.data.program,
      }).then(async (result) => {
        let programId = result.data;

        console.log("hello hello");
        await Axios.post("/api/student/getStudents", {
          programid: programId,
        }).then((result) => {
          let column = [
            {
              label: "First Name",
              field: "fname",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "First Name",
              },
            },
            {
              label: "Last Name",
              field: "lname",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Last Name",
              },
            },
            {
              label: "Father Name",
              field: "fathername",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Father Name",
              },
            },
            {
              label: "Email",
              field: "email",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Email",
              },
            },
            {
              label: "Registration no",
              field: "regno",
              width: 150,
              attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Registration no",
              },
            },
          ];

          let data = [];
          let row = [];
          console.log("my name ", result.data);
          for (let i = 0; i < result.data.length; i++) {
            row.push({
              fname: result.data[i].fname,
              lname: result.data[i].lname,
              fathername: result.data[i].fatherName,
              email: result.data[i].email,
              regno: result.data[i].regNumber,
            });
          }

          console.log("hello ", row);
          this.setState({ data: { columns: column, rows: row } });
          this.setState({ loading: false });
        });
      });
    });
  }

  componentWillMount() {
    var id = localStorage.getItem("user_id");
    this.props.student(id);
  }
  render() {
    console.log(this.props.fsynopsis[0]);
    var studentlistItem = [];
    if (this.props.fsynopsis[0]) {
      studentlistItem = this.props.fsynopsis.map((synopsis, index) => (
        <tr scope="row" key={index}>
          <td>{synopsis.student === null ? "" : synopsis.student.regNumber}</td>
          <td>
            {(synopsis.student === null ? "" : synopsis.student.fname) +
              " " +
              (synopsis.student === null ? "" : synopsis.student.lname)}
          </td>
          <td>{synopsis.title}</td>
          <td>
            <span className="badge badge-success">
              {synopsis.student === null ? "" : synopsis.student.status}
            </span>
          </td>
          <td>
            <Link
              to={
                "/FacultyPortal/ViewStudent/" + (synopsis.student === null)
                  ? ""
                  : synopsis.student._id
              }
            >
              <button
                type="button"
                onClick={this.toggleSuccess}
                className="btn btn-outline-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="icon-eye"></i>
              </button>
            </Link>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <Modal
          isOpen={this.state.success}
          toggle={this.toggleSuccess}
          className={"modal-success " + this.props.className}
        >
          <ModalHeader toggle={this.toggleSuccess}>Modal Student</ModalHeader>
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
            <h3>Student Info</h3>
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
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fsynopsis: state.fstudent.student,
  };
};

const actionCreators = {
  student: getStudent,
};

export default connect(mapStateToProps, actionCreators)(Student);
