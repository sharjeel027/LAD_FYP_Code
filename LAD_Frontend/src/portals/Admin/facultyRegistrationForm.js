import React, { Component } from "react";
import { connect } from "react-redux";
import readXlsxFile from "read-excel-file";
import { getFaculty } from "../../redux/Admin/AdminAction";
import { addfaculty } from "../../redux/Admin/AdminAction";
import { deletefaculty } from "../../redux/Admin/AdminAction";
import { getdept } from "../../redux/Admin/AdminAction";
import { registerFaculty } from "../../redux/Admin/AdminAction";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Axios from "axios";

class FacultyRegistration extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onadd = this.onadd.bind(this);
    this.onReset = this.onReset.bind(this);
    this.importFacultyData = this.importFacultyData.bind(this);
    this.ondeletefaculty = this.ondeletefaculty.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      file: null,
      fname: "",
      laname: "",
      femail: "",
      fdept: "",
      fprog: "",
      password: "",
      dl: [],
      pl: [],
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  importFacultyData() {
    readXlsxFile(this.state.file).then((rows) => {
      rows.map((res) => {
        const faculty = {
          name: res[0] ? res[0] : "",
          email: res[1] ? res[1] : "",
          dept: res[2] ? res[2] : "",
          role: res[3] ? res[3] : "",
        };
        this.props.addfaculty(faculty);
      });
    });

    this.setState({ file: null });
  }

  onadd() {
    const faculty = {
      name: this.state.fname,
      lname: this.state.laname,
      email: this.state.femail,
      dept: this.state.fdept,
      prog: this.state.fprog,
    };
    console.log(faculty);
    this.props.addfaculty(faculty);
  }

  ondeletefaculty(e) {
    console.log(e.target.name);
    this.props.deletefaculty(Number(e.target.name));
  }

  onReset() {
    this.setState({ fname: "" });
    this.setState({ laname: "" });
    this.setState({ femail: "" });
    this.setState({ fdept: "0" });
    this.setState({ fprog: "0" });

    console.log(this.state);
  }

  submit(e) {
    e.preventDefault();
    if (
      this.state.fname == "" ||
      this.state.laname == "" ||
      this.state.fdept == "" ||
      this.state.fprog == "" ||
      this.state.femail == ""
    ) {
      alert("please fill every field first");
    } else {
      // this.props.register(this.props.facultyList);
      Axios.post("/api/admin/registerFaculty", {
        first: this.state.fname,
        last: this.state.laname,
        department: this.state.fdept,
        program: this.state.fprog,
        email: this.state.femail,
        password: "ladlahore",
      })
        .then((res) => {
          alert("faculity added");
        })
        .catch((e) => {
          alert("not added");
        });
    }
    console.log(this.props.successmessage);
    console.log(this.props.failermessage);
  }

  async componentDidMount() {
    await Axios.post("/api/faculty/getAllD").then((result) => {
      this.setState({ dl: result.data });
    });
    await Axios.post("/api/faculty/getAllP").then((result) => {
      this.setState({ pl: result.data });
    });
  }

  componentWillMount() {
    this.props.getfaculty();
    this.props.getdept();
  }

  render() {
    if (this.props.successmessage) {
      alert(this.props.successmessage);
      this.props.history.replace("/AdminDashboard");
    }
    if (this.props.failermessage) {
      alert(this.props.failermessage);
    }
    const facultyList = this.props.facultyList.map((faculty_list, index) => (
      <tr scope="row" key={index}>
        <td>{faculty_list.name}</td>
        <td>{faculty_list.lname}</td>
        <td>{faculty_list.email}</td>
        <td>{faculty_list.dept}</td>
        <td>{faculty_list.prog}</td>

        <td>
          <button
            type="button"
            className="btn btn-outline-danger"
            name={index}
            onClick={this.ondeletefaculty}
          >
            <i name={index} className="icon-trash"></i>
          </button>
        </td>
      </tr>
    ));

    const DeptOptions = this.state.dl.map((dept, index) => (
      <option key={index} value={dept._id}>
        {dept.name}
      </option>
    ));
    const ProgOptions = this.state.pl.map((dept, index) => (
      <option key={index} value={dept._id}>
        {dept.name}
      </option>
    ));
    return (
      <div>
        <Card style={{ width: "70%", marginLeft: "15%", marginTop: "2%" }}>
          <CardHeader>
            <h4>Faculty Registration</h4>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" className="form-horizontal">
              <FormGroup row>
                <Col md="12">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      value={this.state.fname}
                      id="fname"
                      name="fname"
                      placeholder="First Name"
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      value={this.state.laname}
                      id="laname"
                      name="laname"
                      placeholder="Last Name"
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <InputGroup>
                    <Input
                      type="email"
                      value={this.state.femail}
                      id="femail"
                      name="femail"
                      placeholder="Email"
                      onChange={this.onChange}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-envelope-o"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs="12" md="12" size="lg">
                  <Input
                    type="select"
                    name="fprog"
                    id="prog"
                    bsSize="lg"
                    onChange={this.onChange}
                  >
                    <option>select Program</option>
                    {ProgOptions}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs="12" md="12" size="lg">
                  <Input
                    type="select"
                    name="fdept"
                    id="dept"
                    bsSize="lg"
                    onChange={this.onChange}
                  >
                    <option>select department</option>
                    {DeptOptions}
                  </Input>
                </Col>
              </FormGroup>
              {/*  <FormGroup row>
                     <Col xs="12" md="12" size="lg">
                      <Input type="select" name="fprog" id="prog" bsSize="lg" onChange={this.onChange}>
                       {this.state.programs.map((program,index)=>
                       <option key={index} value={program._id}>{program.name}</option>
                       )}
                      </Input>
                    </Col>
                       </FormGroup> */}
            </Form>
          </CardBody>
          <CardFooter>
            <div style={{ float: "right" }}>
              <button
                type="submit"
                size="sm"
                color="success"
                style={{ marginRight: "10px" }}
                onClick={this.submit}
              >
                <i className="fa fa-dot-circle-o"></i>Add
              </button>
              <button
                type="reset"
                size="sm"
                color="danger"
                onClick={this.onReset}
              >
                <i className="fa fa-ban"></i> Reset
              </button>
            </div>
          </CardFooter>
        </Card>
        {/* <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#7d6a82" }}
          >
            <h3>Faculty </h3>
          </CardHeader>
          <CardBody>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Department</th>
                  <th scope="col">Program</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>{facultyList}</tbody>
            </table>
          </CardBody>
          <CardFooter>
            <Button color="ghost-primary">
              <input
                type="file"
                id="facultyfile"
                name="file"
                onChange={this.onChangeFile}
              ></input>
            </Button>
            <Button color="ghost-primary" onClick={this.importFacultyData}>
              <i className="icon-cloud-upload"></i>&nbsp;Import Faculty
            </Button>
            <Button
              color="ghost-success"
              style={{ float: "right" }}
              onClick={this.submit}
            >
              <i className="icon-check"></i>&nbsp;Register Now
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facultyList: state.facultyreg.list,
    departList: state.depart.list,
    successmessage: state.facultyreg.message,
    failermessage: state.facultyreg.registrationfail,
  };
};

const actionCreators = {
  getfaculty: getFaculty,
  addfaculty: addfaculty,
  deletefaculty: deletefaculty,
  getdept: getdept,
  //getprog:getprog,
  register: registerFaculty,
};

export default connect(mapStateToProps, actionCreators)(FacultyRegistration);

/* <FormGroup row>
                    <Col xs="12" md="12" size="lg">
                      <Input type="select" name="frole" id="role" bsSize="lg" onChange={this.onChange}>
                        <option value="0" disabled>Please select role</option>
                        <option value="Supervisor"></option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Both">Supervisor + Reviewer </option>
                      </Input>
                    </Col>
                  </FormGroup> 
                  */
