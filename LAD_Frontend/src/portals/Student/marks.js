import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Progress, Input } from "reactstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "bootstrap";
class MarksSee extends Component {
  constructor(props) {
    super(props);
    this.state = { filesList: [] };
  }

  async componentDidMount() {
    console.log("hshhshshs", this.props.data);
    await axios
      .post("/api/student/getuserinfo", { email: this.props.data.user.email })
      .then(async (result) => {
        console.log("hello  jjj ", result.data);
        await axios
          .post("/api/file/getMarks", { stdId: result.data._id })
          .then(async (result) => {
            console.log(result.data);
            let marks = [];
            for (let i = 0; i < result.data.length; i++) {
              let title = "";
              await axios
                .post("/api/file/getFile", { id: result.data[0].assignId })
                .then((result) => {
                  title = result.data[0].title;
                });
              marks.push({
                _id: result.data[i]._id,
                title: title,
                asmark: result.data[i].marksobtain,
                total: "10",
                percent: result.data[0].prcentage,
              });
            }
            this.setState({ filesList: marks });
          })
          .catch((e) => {
            console.log(e);
          });
      });
  }

  printDocument() {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  }
  render() {
    const facultylistItem = this.state.filesList.map((facultymember, index) => (
      <tr scope="row" key={index}>
        <td>{index}</td>
        <td>{facultymember.title}</td>
        <td>{facultymember.asmark}</td>
        <td>{facultymember.total}</td>
        <td>
          {" "}
          <Progress
            animated
            color="success"
            value={(parseInt(facultymember.asmark) / 10) * 100}
            className="mb-3"
          />
        </td>
      </tr>
    ));

    return (
      <div>
        <Card
          id="pdfdiv"
          style={{ width: "92%", marginLeft: "1%", marginTop: "2%" }}
        >
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#378686" }}
          >
            <h3>Assignemt Marks</h3>
          </CardHeader>
          <CardBody>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Assignment title</th>
                  <th scope="col">Marks obtain</th>
                  <th scope="col">total</th>
                  <th scope="col">progress</th>

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
        <button
          style={{ marginLeft: 100 }}
          className="btn btn-primary"
          onClick={() => this.printDocument()}
        >
          {" "}
          generate report
        </button>
      </div>
    );
  }
}

export default MarksSee;
