import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormText,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import axios from 'axios';
class StudentResigtration extends Component {

  constructor(props){
    super(props)
    this.state = {
      file: null,
      fileURL:null,
      fname:'',
      lname:'',
      fathernam:'',
      email:'',
      regNo:'',
      password1:'',
      password2:'',
      sdept:'',
      batch:'FA16',
      sprogram:'',
      dept:[],
      programs:[],
      programoption:'',
      passwordMatch:true


    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onChangeReg=this.onChangeReg.bind(this);
    this.onReset=this.onReset.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.onChangeDept=this.onChangeDept.bind(this);

  }

  handleImageChange(event) {
    this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file:event.target.files[0]
    })
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeReg(e){
    var email=e.target.value+"@lad.edu.pk";
    this.setState({[e.target.name]: e.target.value,email:email});
  }

  onChangeDept(e){
    console.log(e.target.value)
    this.setState({
        programs:this.state.dept[e.target.value].programs,
        sprogram:this.state.dept[e.target.value].programs[0]._id
    })
    this.setState({[e.target.name]: e.target.value});
  }

  onReset(e){
    this.setState({fname:''});
    this.setState({lname:''});
    this.setState({phoneNumber:''});
    this.setState({password1:''});
    this.setState({password2:''});
    this.setState({areaofinterest:''});
    this.setState({hecAppro:false});
    this.setState({url:''});
  }

  onUpdate(e){

    if(this.state.password1!==this.state.password2){
      this.setState({passwordMatch:false});
    }else{
      var stdregno=this.state.regNo;
      const data={
        fname:this.state.fname,
        lname:this.state.lname,
        regNumber:this.state.regNo,
        fatherName:this.state.fathernam,
        dept:this.state.dept[this.state.sdept]._id,
        program:this.state.sprogram,
        batch:stdregno.substring(0, 4),
        password:this.state.password1,
        email:this.state.email,
      }
      console.log(data);

      axios.post('/api/student/signup',data)
      .then(res=>{
        console.log(res.data);
        alert(res.data.message);
        axios.post('/api/admin/Notify',
        {
          userId:'5e26ca6014e0a32fa3834fcd',
          subject: "Name:"+this.state.fname+this.state.lname+" Registration#:"+this.state.regNo+" has been registered",
          status:"unreaded"
        })
        .then(result=>{
          this.props.history.replace("/");
        })
        .catch(err=>{
          console.log(err);
        }) 
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

  componentWillMount(){
    axios.get('/api/admin/getDepart',)
    .then(res=>{
      console.log(res.data.list);
      var departments=res.data.list.filter(depart => depart.programs.length!==0);
      console.log(departments);
      this.setState({
        dept:departments
      })

      this.setState({
        programs:departments[0].programs
      })

    })
    .catch(err=>{
      console.log(err);

    })
  }

  render() {

    var departments=this.state.dept.filter(depart => depart.programs.length!==0);

    const DeptOptions = departments.map((dept,index)=> 
      <option key={index} value={index}>{dept.name}</option>
    );
/*const DeptOptions = this.props.departList.map((dept,index)=> 
      <option key={index} value={dept.name}>{dept.name}</option>
    );
*/
    

    return (
      <Card style={{width:'60%',marginLeft:'20%',marginTop:'5%'}}>

              <CardBody>
                <h3 style={{textAlign:'center'}}>Student Registration Form</h3>
                <br></br>
                <Form  className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">First Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.fname} id="fname" name="fname" placeholder="Please enter first name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Last Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.lname} id="lname" name="lname" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Father Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.fathernam} id="fathernam" name="fathernam" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Registration Number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.regNo} id="regNo" name="regNo" placeholder="Please enter registration number" onChange={this.onChangeReg}/>
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="text-input">Registration Number</Label>
                    </Col>
                    <Col xs="4" md="3" size="lg">
                      <Input type="select" name="batch" id="batch" bsSize="lg" onChange={this.onChange}>
                        <option value="FA16">FA16</option>
                        <option value="SP17">SP17</option>
                        <option value="FA17">FA17</option>
                        <option value="SP18">SP18</option>
                        <option value="FA18">FA18</option>
                        <option value="SP19">SP19</option>
                        <option value="FA19">FA19</option>
                        <option value="SP20">SP20</option>
                      </Input>
                    </Col>
                    <Col xs="4" md="3" size="lg">
                      <Input type="select" name="prog" id="batch" bsSize="lg" onChange={this.onChange}>
                        <option value="FA16">RBA</option>
                        <option value="SP17">RCH</option>
                        <option value="FA17">RCS</option>
                        <option value="SP18">REC</option>
                        <option value="FA18">REE</option>
                        <option value="SP19">REL</option>
                        <option value="FA19">RMT</option>
                        <option value="SP20">RPH</option>
                      </Input>
                    </Col>
                    <Col xs="4" md="3">
                      <Input type="text" value={this.state.regNo} id="regNo" name="regNo" placeholder="Roll Number" onChange={this.onChange}/>
                    </Col>
                  </FormGroup> */}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="text" value={this.state.email} id="email" name="email" placeholder="Please enter Last name" onChange={this.onChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Department</Label>
                    </Col>
                    <Col xs="3" md="3" size="lg">
                      <Input type="select" name="sdept" id="sdept" bsSize="lg" onChange={this.onChangeDept}>
                     {DeptOptions}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Program</Label>
                    </Col>
                    <Col xs="3" md="3" size="lg">
                      <Input type="select" name="sprogram" id="sprogram" bsSize="lg" onChange={this.onChange}>
                       {this.state.programs.map((program,index)=>
                       <option key={index} value={program._id}>{program.name}</option>
                       )}
                      </Input>
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
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onUpdate} ><i className="fa fa-dot-circle-o"></i> Register</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.onReset} style={{marginLeft:'10px'}}><i className="fa fa-ban"></i> Reset</Button>
                <Link to="/" style={{marginLeft:'10px',float:'right'}}>
                  <Button
                          color="success"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                         Back to Main
                        </Button>
                      </Link>
              </CardFooter>
            </Card>
    );
  }
}
export default StudentResigtration;
