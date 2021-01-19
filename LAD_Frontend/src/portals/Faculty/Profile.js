import { connect } from 'react-redux';
import React, { Component } from 'react';
import {confrimRegistration} from '../../redux/Faculty/FacultyAction';
import {updateProfile} from '../../redux/Faculty/FacultyAction';
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

 class FacultyProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      file: null,
      fileURL:null,
      fname:'',
      lname:'',
      email:'',
      phoneNumber:'',
      password1:'',
      password2:'',
      areaofinterest:'',
      hecAppro:false,
      url:'',
      passwordMatch:true
    }
    
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onReset=this.onReset.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
  }

  handleImageChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file:event.target.files[0]
    })
  }

 /* onChange(e){
    if(e.target.name==="hecAppro"){
      if(this.state.hecAppro===false){
        
        this.setState({hecAppro:true})
      }
      else{
        this.setState({hecAppro:false})
      }
      
    }
    else{
      this.setState({[e.target.name]: e.target.value});
    }
  }
*/

  onReset(e){
    this.setState({fname:''});
    this.setState({lname:''});
    this.setState({phoneNumber:''});
    this.setState({password1:''});
    this.setState({password2:''});
    this.setState({areaofinterest:''});
   // this.setState({hecAppro:false});
    this.setState({url:''});
  }

  onUpdate(e){
    
    if(this.state.password1!==this.state.password2){
      this.setState({passwordMatch:false});
    }else{

    const data={
      fname:this.state.fname,
      lname:this.state.lname,
      phoneNumber:this.state.phoneNumber,
      password:this.state.password1,
      areaofinterest:this.state.areaofinterest,
     // hecAppro:this.state.hecAppro,
      url:this.state.url,
      file:this.state.file,
      email:this.props.regfaculty.faculty.email,
      id:this.props.regfaculty.faculty._id
    }

    this.props.update(data);
  }

    
  }

  componentWillMount(){
    let token = this.props.match.params.token;
    this.props.confReg(token);
  }

  render() {
    console.log(this.props.updatestatus)
    console.log(this.props.regfaculty.faculty.status);
    if(this.props.regfaculty.faculty.lname){
      alert("You are already Verified User");
      this.props.history.replace('/');
    }
    if(this.props.updatestatus.message){
      alert(this.props.updatestatus.message);
      this.props.history.replace('/');
    }

    return (
        <div>
          
          <Card style={{width:'60%',marginLeft:'20%',marginTop:'5%'}}>
              <CardBody>
                <div style={{textAlign:'center'}}>
                <h3 >Faculty Profile</h3>
                <br></br>
                <br></br>
                <img src={this.state.fileURL} width="250px" height="250px" alt="Please Select Profile Picture "/>
                <br></br>
                <br></br>
                <input type="file" onChange={this.handleImageChange}></input>
                <br></br>
                <br></br>
                <h5>WelCome {this.props.regfaculty.faculty.fname} to LAD E-Learning</h5>
                <br></br>
                <br></br>
                </div>
                <Form  className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.fname} id="fname" name="fname" placeholder="Please enter first name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup><FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.lname} id="lname" name="lname" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <p>{this.props.regfaculty.faculty.email}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">PhoneNumber</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.phoneNumber} id="phoneNumber" name="phoneNumber" placeholder="Please enter phone number" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Area of Interest:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" value={this.state.areaofinterest} name="areaofinterest" id="areaofinterest" rows="9"
                             placeholder="Content..." onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">LAD Profile URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.url} id="url" name="url" placeholder="Please enter url" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" value={this.state.password1} id="password1" name="password1" placeholder="Password" autoComplete="new-password" onChange={this.onChange}/>
                      <FormText className="help-block">Please enter a password greater than 8 digit</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Confirm Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" value={this.state.password2} id="password2" name="password2" placeholder="Password" autoComplete="new-password" onChange={this.onChange}/>
                      <FormText className="help-block" hidden={(this.state.passwordMatch)?true:false}><p style={{color:'red'}}>Password does not match please re-enter</p></FormText>
                    </Col>
                  </FormGroup>
                {/*  <FormGroup row>
                    <Col md="3"><Label>HEC Approved?</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input"  type="checkbox" id="hecAppro" name="hecAppro" value={this.state.hecAppro} onChange={this.onChange}/>
                        <Label check className="form-check-label" htmlFor="checkbox1">Yes</Label>
                      </FormGroup>
                    </Col>
                </FormGroup>  */}
                 
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onUpdate} ><i className="fa fa-dot-circle-o"></i> Update</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.onReset}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    regfaculty: state.registFaculty,
    updatestatus:state.facultyProfileUpdate
  }
}

const actionCreators = {
 confReg:confrimRegistration,
 update:updateProfile
}
export default connect(mapStateToProps,actionCreators)(FacultyProfile);
