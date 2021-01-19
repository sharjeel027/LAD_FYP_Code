import React, { Component } from "react";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
class FaculityCourses extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, name: "", dl: [], dpid: "" };
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleInputUrl = (event) => {
    this.setState({ name: event.target.value });
  };

  handleLinkAdd = async () => {
    if (this.state.name == "" || this.state.dpid == "") {
      alert("please enter the name course first or select department");
    } else {
      await axios
        .post("/api/admin/addProgram", {
          programName: this.state.name,
          departId: this.state.dpid,
        })
        .then((res) => {
          alert("program added successfully");
        })
        .catch((e) => {
          alert("program is not added try again");
        });

      console.log(this.state.name, this.state.dpid);
    }
  };

  onChange = (event) => {
    this.setState({ dpid: event.target.value });
  };

  async componentDidMount() {
    await axios.post("/api/faculty/getAllD").then((result) => {
      this.setState({ dl: result.data });
    });
    await axios.post("/api/faculty/getAllDepartments").then(async (result) => {
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
          label: "course name",
          field: "name",
          width: 150,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "course name",
          },
        },
      ];

      console.log(result.data);

      let data = [];
      let row = [];
      for (let i = 0; i < result.data.length; i++) {
        row.push({
          no: i,
          name: result.data[i].name,
        });
      }
      this.setState({ data: { columns: column, rows: row } });
    });
  }
  render() {
    const DeptOptions = this.state.dl.map((dept, index) => (
      <option key={index} value={dept._id}>
        {dept.name}
      </option>
    ));
    return (
      <div>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#789e8e" }}
          >
            <h3>Student details</h3>
          </CardHeader>
          <CardBody>
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={this.state.data}
              proSelect
            />
          </CardBody>
        </Card>

        <div>
          <form
            className="form-inline "
            style={{ marginTop: 50, marginLeft: 12 }}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail2"
                defaultValue="add new Program"
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter program name"
                onChange={this.handleInputUrl}
              />
            </div>

            <Input
              type="select"
              name="fdept"
              id="dept"
              bsSize="lg"
              onChange={this.onChange}
            >
              <option>Select Department</option>
              {DeptOptions}
            </Input>
            <button
              onClick={this.handleLinkAdd}
              className="btn btn-primary mb-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FaculityCourses;
