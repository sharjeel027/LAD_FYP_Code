import React, { Component, } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Label,
  } from 'reactstrap';


class StudentShow extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          student:{},
          synopsis:{},
          department:{},
          program:{}
        };
      }

    componentWillMount(){
        var id=this.props.match.params.id;
        axios.post('/api/student/getById',{sid:id})
        .then(res=>{
            console.log(res.data);
            this.setState({
                student:res.data.student,
                synopsis:res.data.student.Synopsis[0],
                department:res.data.student.Department[0],
                program:res.data.student.Program[0]
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

  render() {

    return (
      <div className="animated fadeIn">
        
        <Card style={{width:'60%',marginLeft:'20%',marginTop:'5%'}}>
              <CardBody>
                <div style={{textAlign:'center'}}>
                <h3 >Student</h3>
                <br></br>
                <br></br>
                <img src={"https://fyp-ssrs.herokuapp.com/"+(this.state.student.profileImage?this.state.student.profileImage:'')} width="250px" height="250px" alt="Please Select Profile Picture "/>
                <br></br>
                <br></br>
                </div>
                <Form  className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <h5>{this.state.student.fname}</h5>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <h5>{this.state.student.lname}</h5>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Father Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.state.student.fatherName}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Registration Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.state.student.regNumber}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Batch</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <p>{this.state.student.batch}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Program</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.state.program.name}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Department</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.state.department.name}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.state.student.email}</p>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>

      </div>
    );
  }
}

export default StudentShow;
