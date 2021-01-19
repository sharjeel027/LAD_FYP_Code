import React, { Component } from "react";
import Axios from "axios";
import { Card, CardBody, CardHeader, Progress, Input } from "reactstrap";

class Addno extends Component {
  constructor(props) {
    super(props);
    this.state = { linkData: [], assignment: [], assId: "", marks: "" };
  }

  async componentDidMount() {
    await Axios.post("/api/faculty/getFaculity", {
      id: this.props.data.userId,
    }).then(async (result) => {
      await Axios.post("/api/faculty/getProgramId", {
        name: result.data.program,
      }).then(async (result) => {
        let programId = result.data;

        await Axios.post("/api/file/getAllFiles", { id: programId })
          .then((result) => {
            let data = [];
            for (let i = 0; i < result.data.length; i++) {
              data.push(result.data[i]);
            }
            this.setState({ assignment: data });
          })
          .catch((e) => {
            console.log(e);
          });
        await Axios.post("/api/student/getStudents", {
          programid: programId,
        }).then((result) => {
          let data = [];
          let row = [];
          console.log("my name ", result.data);
          for (let i = 0; i < result.data.length; i++) {
            row.push({
              _id: result.data[i]._id,
              fname: result.data[i].fname,
              lname: result.data[i].lname,
              fathername: result.data[i].fatherName,
              email: result.data[i].email,
              regno: result.data[i].regNumber,
            });
          }

          console.log("hello ", row);
          this.setState({ linkData: row });
        });
      });
    });
  }

  onChange = (event) => {
    this.setState({ assId: event.target.value });
  };

  onMarkschange = (event) => {
    this.setState({ marks: event.target.value });
  };

  async onadd(stdid) {
    if (this.state.marks == "" || this.state.assId == "") {
      alert("please enter marks first and select assign first");
    } else {
      console.log("hhehehehhehehe ", stdid);
      await Axios.post("/api/file/addMarks", {
        aid: this.state.assId,
        stdId: stdid,
        mob: this.state.marks,
        per: ((parseFloat(this.state.marks) / 10) * 100).toString(),
      });

      alert("marks added succuess fully");
      window.location.reload(false);
    }
  }

  render() {
    const facultylistItem = this.state.linkData.map((facultymember, index) => (
      <tr scope="row" key={index}>
        <td>{index}</td>
        <td>{facultymember.fname}</td>
        <td>{facultymember.lname}</td>
        <td>{facultymember.email}</td>
        <td>{facultymember.regno}</td>
        <td>
          <Input
            type="select"
            name="fdept"
            id="dept"
            bsSize="lg"
            onChange={this.onChange}
          >
            <option>Select Assignment</option>
            {this.state.assignment.map((assignment, indexs) => {
              return (
                <option key={indexs} value={assignment._id}>
                  {assignment.title}
                </option>
              );
            })}
          </Input>
        </td>
        <td>
          <Input
            name="fdept"
            id="dept"
            bsSize="lg"
            onChange={this.onMarkschange}
          />
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => this.onadd(facultymember._id)}
          >
            <i class="icon-plus"></i>
          </button>
        </td>
        {/* <td>
          <button type="button" class="btn btn-primary">
            <i class="icon-plus"></i>
          </button>
        </td> */}
      </tr>
    ));
    return (
      <div>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#378686" }}
          >
            <h3>Add or updates marks</h3>
          </CardHeader>
          <CardBody>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">first name</th>
                  <th scope="col">last name</th>
                  <th scope="col">email</th>
                  <th scope="col">regno</th>
                  <th scope="col">assignemt no</th>
                  <th scope="col">obtain marks</th>
                  <th scope="col">Add</th>
                  {/* <th scope="col">Update</th> */}
                  {/* <th scope="col">Status</th> */}
                  {/* <th scope="col">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {facultylistItem.length !== 0
                  ? facultylistItem
                  : //   <tr>
                    //     <td>
                    //       <img src={nodataImage}></img>
                    //     </td>
                    //   </tr>
                    null}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Addno;
