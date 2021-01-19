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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFacultyList } from "../../redux/Admin/AdminAction";
import nodataImage from "../../assets/img/nodata.png";
import axios from "axios";
class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  assignRole(id, role) {
    return function () {
      console.log(id, role);
      axios
        .post("/api/admin/assignRole", { id: id, role: role })
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        })

        .catch((err) => {
          alert(err);
        });
    };
  }

  deleteRole(id, role) {
    return function () {
      console.log(id, role);
      axios
        .post("/api/admin/deleteRole", { id: id, role: role })
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        })

        .catch((err) => {
          alert(err);
        });
    };
  }

  deleteFaculty(fid) {
    return function () {
      axios
        .post("/api/faculty/ChangeStatus", { id: fid, status: "Deleted" })
        .then((res) => {
          if (res.data.message) {
            alert("Faculty Deleted Success..!!!");
          }
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  componentWillMount() {
    this.props.getfaculty();
  }

  render() {
    console.log(this.props.facultyList);
    const facultylistItem = this.props.facultyList.facultyList
      .filter((fclt) => fclt.status !== "Deleted")
      .map((facultymember, index) => (
        <tr scope="row" key={index}>
          <td>{facultymember.fname + " " + facultymember.lname}</td>
          <td>
            {facultymember.isReviewer
              ? facultymember.isSupervisor
                ? "Both"
                : "Reviewer"
              : facultymember.isSupervisor
              ? "Supervisor"
              : "Not Assigned"}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-pill btn-primary"
              onClick={this.assignRole(facultymember._id, "Reviewer")}
              hidden={facultymember.isReviewer ? true : false}
            >
              Reviewer
            </button>
            <button
              type="button"
              class="btn btn-pill btn-primary"
              onClick={this.assignRole(facultymember._id, "Supervisor")}
              hidden={facultymember.isSupervisor ? true : false}
              style={{ marginLeft: "10px" }}
            >
              Supervisor
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-pill btn-primary"
              onClick={this.deleteRole(facultymember._id, "Reviewer")}
              hidden={facultymember.isReviewer ? false : true}
            >
              Reviewer
            </button>
            <button
              type="button"
              class="btn btn-pill btn-primary"
              onClick={this.deleteRole(facultymember._id, "Supervisor")}
              hidden={facultymember.isSupervisor ? false : true}
              style={{ marginLeft: "10px" }}
            >
              Supervisor
            </button>
          </td>
          <td>
            {" "}
            <Progress
              animated
              color="success"
              value={Math.floor(Math.random() * 100) + 1}
              className="mb-3"
            />
          </td>
          <td>
            <Link to={"/AdminDashboard/facultyShow/" + facultymember._id}>
              <button
                type="button"
                class="btn btn-outline-primary"
                style={{ marginRight: "10px" }}
              >
                <i class="icon-eye"></i>
              </button>
            </Link>
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
      <div>
        <Modal
          isOpen={this.state.success}
          toggle={this.toggleSuccess}
          className={"modal-success " + this.props.className}
        >
          <ModalHeader toggle={this.toggleSuccess}>Modal Faculty</ModalHeader>
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
            style={{ textAlign: "center", backgroundColor: "#7d6a82" }}
          >
            <h3>Faculty </h3>
            <button
              type="button"
              class="btn btn-pill btn-success"
              style={{ position: "absolute", right: "1%", top: "3%" }}
            >
              <Link to={"/AdminDashboard/facultyregistration"}>
                <i class="icon-plus"></i>
              </Link>
            </button>
          </CardHeader>
          <CardBody>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Assign Role</th>
                  <th scope="col">Delete Role</th>
                  <th scope="col">Performance</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {facultylistItem.length !== 0 ? (
                  facultylistItem
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <img src={nodataImage}></img>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
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

const mapStateToProps = (state) => {
  return {
    facultyList: state.adminfaculty,
  };
};

const actionCreators = {
  getfaculty: getFacultyList,
};

export default connect(mapStateToProps, actionCreators)(Faculty);
