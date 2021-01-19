import { connect } from 'react-redux';
import React, { Component } from 'react';
import {getpProfile} from '../../redux/Faculty/FacultyAction';
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

 class FacultyProfileUpdate extends Component {

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
      //hecAppro:false,
      url:'',
      email:'',
      passwordMatch:true,
      updaterequest:false


    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onChangePass=this.onChangePass.bind(this);
    this.onReset=this.onReset.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    
  }

  handleImageChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file:event.target.files[0]
    })
  }

  onChangePass(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onChange(e){
    if(e.target.name==="hecAppro"){
      if(this.state.hecAppro===false){
        
        this.setState({hecAppro:true})
      }
      else{
        this.setState({hecAppro:false})
      }
      
    }
    else{
      if(e.target.value){
        this.setState({[e.target.name]: e.target.value});
      }else{
        this.setState({[e.target.name]: ' '});
      }
      
    }
  }

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
      fname:(this.state.fname)?this.state.fname:this.props.fprofile.fname,
      lname:(this.state.lname)?this.state.lname:this.props.fprofile.lname,
      phoneNumber:(this.state.phoneNumber)?this.state.phoneNumber:this.props.fprofile.phoneNumber,
      password:this.state.password1,
      areaofinterest:(this.state.areaofinterest)?this.state.areaofinterest:this.props.fprofile.AreaofInterest,
     // hecAppro:this.state.hecAppro,
      url:(this.state.url)?this.state.url:this.props.fprofile.profileLink,
      file:this.state.file,
      email:(this.state.email)?this.state.email:this.props.fprofile.email,
      id:this.props.fprofile._id,
    }

    

    this.props.update(data);

    this.setState({
      updaterequest:true
    })

  }

  }

  componentWillMount(){
    var id=localStorage.getItem('user_id');
   this.props.profile(id);

 }
  render() {

    if(this.state.updaterequest && this.props.updatestatus.message){
      alert(this.props.updatestatus.message);
      this.props.history.replace('/FacultyPortal/Home');
    }

    return (
        <div>
          
          <Card style={{width:'60%',marginLeft:'20%',marginTop:'5%'}}>
              <CardBody>
                <div style={{textAlign:'center'}}>
                <h3 >Faculty Profile</h3>
                <br></br>
                <br></br>
                <img src={(this.state.fileURL)?this.state.fileURL:"https://fyp-ssrs.herokuapp.com/"+this.props.fprofile.profileImage} width="250px" height="250px" alt="Please Select Profile Picture "/>
                <br></br>
                <br></br>
                <input type="file" onChange={this.handleImageChange}></input>
                <br></br>
                <br></br>
                </div>
                <Form  className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={(this.state.fname)?this.state.fname:this.props.fprofile.fname} id="fname" name="fname" placeholder="Please enter first name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup><FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={(this.state.lname)?this.state.lname:this.props.fprofile.lname} id="lname" name="lname" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="text" value={(this.state.email)?this.state.email:this.props.fprofile.email} id="email" name="email" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">PhoneNumber</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={(this.state.phoneNumber)?this.state.phoneNumber:this.props.fprofile.phoneNumber} id="phoneNumber" name="phoneNumber" placeholder="Please enter phone number" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Area of Interest:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" value={(this.state.areaofinterest)?this.state.areaofinterest:this.props.fprofile.AreaofInterest} name="areaofinterest" id="areaofinterest" rows="9"
                             placeholder="Content..." onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">LAD Profile URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={(this.state.url)?this.state.url:this.props.fprofile.profileLink} id="url" name="url" placeholder="Please enter url" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" value={this.state.password1} id="password1" name="password1" placeholder="Password" autoComplete="new-password" onChange={this.onChangePass}/>
                      <FormText className="help-block">Please enter a password greater than 8 digit</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Confirm Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" value={this.state.password2} id="password2" name="password2" placeholder="Password" autoComplete="new-password" onChange={this.onChangePass}/>
                      <FormText className="help-block" hidden={(this.state.passwordMatch)?true:false}><p style={{color:'red'}}>Password does not match please re-enter</p></FormText>
                    </Col>
                  </FormGroup>
                 {/* <FormGroup row>
                    <Col md="3"><Label>HEC Approved?</Label></Col>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input"  type="checkbox" id="hecAppro" name="hecAppro" value={this.state.hecAppro} onChange={this.onChange}/>
                        <Label check className="form-check-label" htmlFor="checkbox1">Yes</Label>
                      </FormGroup>
                    </Col>
                 </FormGroup> */}
                 
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onUpdate} ><i className="fa fa-dot-circle-o"></i> Update</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.onReset} style={{marginLeft:'10px'}}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
        </div>
    );
  }
}
const mapStateToProps = state => {
return {
      fprofile: state.fprofile.faculty,
      updatestatus:state.facultyProfileUpdate
    }
}
  
const actionCreators = {
profile:getpProfile,
update:updateProfile
}

export default connect(mapStateToProps,actionCreators)(FacultyProfileUpdate);