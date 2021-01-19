import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Progress } from "reactstrap";
import { connect } from "react-redux";
import { getStudent } from "../../redux/Admin/AdminAction";
import { facultyLogin } from "../../redux/Faculty/FacultyAction";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import nodataImage from "../../assets/img/nodata.png";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";

am4core.useTheme(am4themes_animated);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
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
          .post("/api/faculty//getProgramName", { id: result.data[i].program })
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
      this.setState({ data: { columns: column, rows: row } });
    });
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [
      {
        synopsisStatus: "Students",
        count: 30,
      },
      {
        synopsisStatus: "Faculty",
        count: 8,
      },
      {
        synopsisStatus: "Departments",
        count: 2,
      },
      {
        synopsisStatus: "Programs",
        count: 15,
      },
      {
        synopsisStatus: "Feedback",
        count: 3,
      },
      {
        synopsisStatus: "Batches",
        count: 3,
      },
    ];

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "synopsisStatus";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add(
      "dy",
      function (dy, target) {
        if (target.dataItem && target.dataItem.index & (2 == 2)) {
          return dy + 25;
        }
        return dy;
      }
    );

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "synopsisStatus";
    series.name = "count";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 0;
    columnTemplate.strokeOpacity = 1;

    columnTemplate.fill = am4core.color("#4591c3");
    columnTemplate.adapter.add("fill", function (fill, target) {
      if (target.dataItem && target.dataItem.valueY < 5) {
        return am4core.color("#B00100");
      } else if (target.dataItem && target.dataItem.valueY < 10) {
        return am4core.color("#008000");
      } else if (target.dataItem && target.dataItem.valueY < 20) {
        return am4core.color("#3c3cc7");
      } else if (target.dataItem && target.dataItem.valueY < 30) {
        return am4core.color("#9aa531");
      } else if (target.dataItem && target.dataItem.valueY < 50) {
        return am4core.color("#2196f3");
      } else if (target.dataItem && target.dataItem.valueY < 100) {
        return am4core.color("#c450d8");
      } else {
        return fill;
      }
    });

    this.chart = chart;
  }

  presented(id) {
    return function () {
      console.log(id);
      axios
        .post("/api/synopsis/ChangeStatus", { id: id, status: "Presented" })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  componentWillMount() {
    this.props.getStudent();
    this.props.signin();

    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const studentlistItem = this.props.studentList.map(
      (student_list, index) => (
        <tr scope="row" key={index}>
          {console.log(student_list.Synopsis.length)}
          <td>{student_list.regNumber}</td>
          <td>{student_list.fname + " " + student_list.lname}</td>
          <td>
            {student_list.Synopsis[0]
              ? student_list.Synopsis[0].title
              : "Not submitted"}
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
              {student_list.Synopsis[0] ? student_list.Synopsis[0].status : ""}
            </span>
          </td>
          <td>
            <button
              hidden={
                (
                  student_list.Synopsis[0]
                    ? student_list.Synopsis[0].status === "Submitted"
                    : false
                )
                  ? false
                  : true
              }
              type="button"
              className="btn btn-outline-secondary"
            >
              {student_list.Synopsis[0] ? (
                <Link
                  to={
                    "/AdminDashboard/addReviewtask/" +
                    (student_list.Synopsis.length !== 0
                      ? student_list.Synopsis[0]._id
                      : "")
                  }
                >
                  <i className="icon-user-following"></i>&nbsp;Assign for Review
                </Link>
              ) : (
                <Link to={"/AdminDashboard/addReviewtask/"}>
                  <i className="icon-user-following"></i>&nbsp;Assign for Review
                </Link>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              hidden={
                (
                  student_list.Synopsis[0]
                    ? student_list.Synopsis[0].commenents.length === 3 &&
                      student_list.Synopsis[0].status === "Commented"
                    : true
                )
                  ? false
                  : true
              }
            >
              <Link
                to={
                  "/AdminDashboard/commentsAnalysis/" +
                  (student_list.Synopsis.length === 0)
                    ? ""
                    : student_list.Synopsis[0]._id
                }
              >
                <i className="icon-user-following"></i>&nbsp; Analyze Comments
              </Link>
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.presented(
                student_list.Synopsis.length === 0
                  ? ""
                  : student_list.Synopsis[0]._id
              )}
              hidden={
                (
                  student_list.Synopsis.length === 0
                    ? true
                    : student_list.Synopsis[0].status === "PresentationSchedule"
                )
                  ? false
                  : true
              }
            >
              <i className="icon-user-following"></i>&nbsp; Presented
            </button>
          </td>
        </tr>
      )
    );

    console.log(studentlistItem.length);
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-3">
            <Card style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <CardHeader
                style={{ textAlign: "center", backgroundColor: "#4591c3" }}
              >
                <h3>30</h3>
                <h5>Student Registered</h5>
              </CardHeader>
            </Card>
          </div>
          <div className="col-md-3">
            <Card style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <CardHeader
                style={{ textAlign: "center", backgroundColor: "#3c3cc7" }}
              >
                <h3>8</h3>
                <h5>Faculty Registered</h5>
              </CardHeader>
            </Card>
          </div>
          <div className="col-md-3">
            <Card style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <CardHeader
                style={{ textAlign: "center", backgroundColor: "green" }}
              >
                <h3>15</h3>
                <h5>Programs</h5>
              </CardHeader>
            </Card>
          </div>
          <div className="col-md-3">
            <Card style={{ width: "90%", marginLeft: "5%", marginTop: "2%" }}>
              <CardHeader
                style={{ textAlign: "center", backgroundColor: "#d03f3f" }}
              >
                <h3>2</h3>
                <h5>Departments</h5>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div
          id="chartdiv"
          style={{ width: "80%", height: "500px", marginLeft: "10%" }}
        ></div>
        <div className="row" style={{ marginLeft: "2%" }}>
          <Card style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}>
            <CardHeader
              style={{ textAlign: "center", backgroundColor: "#899096" }}
            >
              <h4>Students</h4>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.student.list,
    userData2: state.faculty.faculty,
  };
};

const actionCreators = {
  getStudent: getStudent,
  signin: facultyLogin,
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
