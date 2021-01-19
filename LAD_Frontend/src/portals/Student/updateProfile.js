import React, { Component, lazy, Suspense } from 'react';
import withAuth from '../withAuth';
import { Card, CardBody, Form, FormGroup,Col,Label,CardFooter,Button,Input,FormText} from 'reactstrap';
import axios from 'axios';


class UpdateProfile extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      student:{},
      department:{},
      program:{},
      file: null,
      fileURL:null,
      password1:'',
      password2:'',
      passwordMatch:true,
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
    
      if(e.target.value){
        this.setState({[e.target.name]: e.target.value});
      }else{
        this.setState({[e.target.name]: ' '});
      }
      
  }

  onReset(e){
    this.setState({password1:''});
    this.setState({password2:''});
  }

  onUpdate(e){
    
    if(this.state.password1!==this.state.password2){
      this.setState({passwordMatch:false});
    }else{

      let formData= new FormData();
      var id=localStorage.getItem('user_id');

      formData.append('password',this.state.password1);
      formData.append('profilePicture',this.state.file);
      formData.append('id',id);

      axios({
        url:'/api/student/updateProfile',
        method:'POST',
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      })
      .then(response => {
          console.log(response.data);
          alert(response.data.message);
          this.props.history.replace("/StudentPortal/Home");
         
        })
        .catch(error => {
          console.log(error);
          alert(error);

      })
  

  }

  }

  componentWillMount(){
    var id=localStorage.getItem('user_id');
    axios.post('/api/student/getById',{sid:id})
    .then(res=>{
      console.log(res);
      this.setState({
        student:res.data.student,
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
                <img src={(this.state.fileURL)?this.state.fileURL:"https://fyp-ssrs.herokuapp.com/"+(this.state.student.profileImage?this.state.student.profileImage:'')} width="250px" height="250px" alt="Please Select Profile Picture "/>
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
                        <h5>{this.state.student.fname+" "+this.state.student.lname}</h5>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <p>{this.state.student.email}</p>
                    </Col>
                  </FormGroup>
                </Form>
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

export default UpdateProfile;
