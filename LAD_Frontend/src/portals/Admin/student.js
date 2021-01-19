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
import { Link } from "react-router-dom";
import { getStudent } from "../../redux/Admin/AdminAction";
import nodataImage from "../../assets/img/nodata.png";
import axios from "axios";
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
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await axios.post("/api/student/getAllStudents").then(async (result) => {
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
        {
          label: "Department",
          field: "dept",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Department",
          },
        },
        {
          label: "program",
          field: "prog",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "program",
          },
        },
      ];

      let data = [];
      let row = [];
      console.log("my name ", result.data);
      for (let i = 0; i < result.data.length; i++) {
        let programeNmae = "";
        let departmentname = "";
        await axios
          .post("/api/faculty/getdepartmentname", {
            id: result.data[i].department,
          })
          .then((result) => {
            departmentname = result.data;
          });
        await axios
          .post("/api/faculty/getProgramName", { id: result.data[i].program })
          .then((result) => {
            programeNmae = result.data;
          });
        row.push({
          fname: result.data[i].fname,
          lname: result.data[i].lname,
          fathername: result.data[i].fatherName,
          email: result.data[i].email,
          regno: result.data[i].regNumber,
          dept: departmentname,
          prog: programeNmae,
        });
      }
      this.setState({ data: { columns: column, rows: row }, loading: false });
    });
  }

  handleDelete(sid) {
    return function () {
      axios
        .post("/api/student/ChangeStatus", { id: sid, status: "Deleted" })
        .then((res) => {
          if (res.data.message) {
            alert("Student Deleted Success..!!!");
          }
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  componentWillMount() {
    this.props.getStudent();
  }

  render() {
    const studentlistItem = this.props.studentList
      .filter((std) => std.status !== "Deleted")
      .map((student_list, index) => (
        <tr scope="row" key={index}>
          <td>{student_list.regNumber}</td>
          <td>{student_list.fname + " " + student_list.lname}</td>
          <td>
            {student_list.Synopsis[0] ? student_list.Synopsis[0].title : ""}
          </td>
          <td>
            <span
              className={
                student_list.Synopsis[0]
                  ? student_list.Synopsis[0].status === "Registring"
                    ? "badge badge-warning"
                    : student_list.Synopsis[0].status === "Submitted"
                    ? "badge badge-warning"
                    : student_list.Synopsis[0].status === "UnderReview"
                    ? "badge badge-secondary"
                    : student_list.Synopsis[0].status === "Revised"
                    ? "badge badge-primary"
                    : student_list.Synopsis[0].status === "Presented"
                    ? "badge badge-info"
                    : student_list.Synopsis[0].status === "Approved"
                    ? "badge badge-success"
                    : "badge badge-light"
                  : "badge badge-danger"
              }
            >
              {student_list.Synopsis[0]
                ? student_list.Synopsis[0].status
                : "Not Submitted"}
            </span>
          </td>
          <td>
            <span className="badge badge-success">{student_list.status}</span>
          </td>
          <td>
            <Link to={"/AdminDashboard/studentShow/" + student_list._id}>
              <button
                type="button"
                onClick={this.toggleSuccess}
                className="btn btn-outline-primary"
                style={{ marginRight: "10px" }}
              >
                <i className="icon-eye"></i>
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={this.handleDelete(student_list._id)}
            >
              <i className="icon-trash"></i>
            </button>
          </td>
        </tr>
      ));
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
            <h3>Student details</h3>
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
    studentList: state.student.list,
  };
};

const actionCreators = {
  getStudent: getStudent,
};

export default connect(mapStateToProps, actionCreators)(Student);
