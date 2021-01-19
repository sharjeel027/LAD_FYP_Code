import { Card, CardBody, Form, FormGroup,Col,Label,CardFooter,Button } from 'reactstrap';
import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      admin:{},
      file: null,
      fileURL:null,
      canUpdate:false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.onUpdateprofile=this.onUpdateprofile.bind(this);
  }


  handleImageChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file:event.target.files[0]
    })
  }

  onUpdate(e){
    this.setState({canUpdate:true});
  }

  onUpdateprofile(e){
    
    if(this.state.password1!==this.state.password2){
      this.setState({passwordMatch:false});
    }else{

      let formData= new FormData();
      var id=localStorage.getItem('user_id');

      formData.append('profilePicture',this.state.file);
      formData.append('id',id);

      axios({
        url:'/api/admin/updateProfile',
        method:'POST',
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        data:formData
      })
      .then(response => {
          console.log(response.data);
          alert(response.data.message);
          this.props.history.replace("/AdminDashboard/dashboard");
         
        })
        .catch(error => {
          console.log(error);
          alert(error);

      })
  

  }

  }

  componentWillMount(){
    var id=localStorage.getItem('user_id');
    axios.post('/api/admin/getprofile',{adminid:id})
    .then(res=>{
      console.log(res);
      var admin=res.data.data;
      if(!admin.profileImage){
        this.setState({
          canUpdate:true
        })
      }
      this.setState({
        admin:res.data.data
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
              <h3 >Admin</h3>
              <br></br>
              <br></br>
              <img src={(this.state.fileURL)?this.state.fileURL:"https://fyp-ssrs.herokuapp.com/"+(this.state.admin.profileImage?this.state.admin.profileImage:'')} width="250px" height="250px" alt="Please Select Profile Picture "/>
              <br></br>
              <br></br>
              <input type="file" onChange={this.handleImageChange} style={{display:(this.state.canUpdate?'inline':'none')}}></input>
              <br></br>
              <br></br>
              </div>
              <Form  className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                      <h5>Muhammad Sharjeel Khan</h5>
                      
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Email</Label>
                  </Col>
                  <Col xs="12" md="9">
                      <p>{this.state.admin.email}</p>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.onUpdate} style={{display:(this.state.canUpdate?'none':'inline')}}><i className="fa fa-dot-circle-o"></i> Update</Button>
              <Button type="submit" size="sm" color="success" onClick={this.onUpdateprofile} style={{display:(this.state.canUpdate?'inline':'none')}}><i className="fa fa-dot-circle-o"></i> Update Profile</Button>
            </CardFooter>
          </Card>

    </div>
    );
  }
}
