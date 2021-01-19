import { connect } from 'react-redux';
import React, { Component } from 'react';
import {getpProfile} from '../../redux/Faculty/FacultyAction';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

 class FacultyShow extends Component {

  constructor(props){
    super(props)

    this.onUpdate=this.onUpdate.bind(this);
  }



  onUpdate(e){
    this.props.history.replace('/FacultyPortal/ProfileUpdate');

  }

  componentWillMount(){
     var id=this.props.match.params.id;
    this.props.profile(id);

  }

  render() {

        console.log(this.props.fprofile);
    return (
        <div>
          
          <Card style={{width:'60%',marginLeft:'20%',marginTop:'5%'}}>
              <CardBody>
                <div style={{textAlign:'center'}}>
                <h3 >Faculty Profile</h3>
                <br></br>
                <br></br>
                <img src={"https://fyp-ssrs.herokuapp.com/"+this.props.fprofile.profileImage} width="250px" height="250px" alt="Please Select Profile Picture "/>
                <br></br>
                <br></br>
                </div>
                <Form  className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <h5>{this.props.fprofile.fname}</h5>
                    </Col>
                  </FormGroup><FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <h5>{this.props.fprofile.lname}</h5>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.props.fprofile.email}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">PhoneNumber</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <p>{this.props.fprofile.phoneNumber}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Area of Interest:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.props.fprofile.AreaofInterest}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">COMSATS Profile URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <a href={this.props.fprofile.profileLink}>Click here to visit COMSATS Profile</a>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3"><Label>HEC Approved?</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                      <p>{(this.props.fprofile.isHecApproved)?'Yes':'No'}</p>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fprofile: state.fprofile.faculty,
  }
}

const actionCreators = {
 profile:getpProfile,
}
export default connect(mapStateToProps,actionCreators)(FacultyShow);