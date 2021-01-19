import React, { Component } from "react";
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  CardHeader,
  Form,
  Input,
  Label,
  FormGroup,
  Row,
} from "reactstrap";

class SynopsisUpload extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      student:{},
      Synopsis:{},
      synopsisFile:null,
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState( {synopsisFile:e.target.files[0]});
  }

  onSubmit(e){

    e.preventDefault();
    
    let formData= new FormData();

    formData.append('synopsisId',this.state.Synopsis._id);
    formData.append('synopsisFile',this.state.synopsisFile);

    axios({
      url:'/api/synopsis/uploadSynopsis',
      method:'POST',
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      data:formData
    })
    .then(res=>{
      console.log(res);
      alert(res.data.message);
      axios.post('/api/admin/Notify',
      {
        userId:'5e26ca6014e0a32fa3834fcd',
        subject: "Name:"+this.state.student.fname+this.state.student.lname+" Registration#:"+this.state.student.regNumber+" has submit Synopsis.",
        status:"unreaded"
      })
      .then(result=>{
        this.props.history.replace("/StudentPortal");
      })
      .catch(err=>{
        console.log(err);
      })
    })
    .catch(err=>{
      console.log(err);
      alert(err);
    })
    
  }
  componentWillMount(){
    
    var id=localStorage.getItem('user_id');

      axios.post('/api/student/getById',{sid:id})
      .then(res=>{
        console.log(res.data.student.Synopsis);
        this.setState({
          student:res.data.student
        })
        this.setState({
          Synopsis:res.data.student.Synopsis[0]
        })
      })
      .catch(err=>{
        console.log(err);
      })

     
  }

  render() {
    console.log(this.state.Synopsis.title)
    return (
      <div>
        <Card style={{ width: "92%", marginLeft: "1%", marginTop: "3%" }}>
          <CardHeader
            style={{ textAlign: "center", backgroundColor: "#647280" }}
          >
            <h3>Upload Synopsis</h3>
          </CardHeader>
          <CardBody>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form  className="form-horizontal">
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Synopsis Title</Label>
                          </Col>
                          <Col xs="12" md="6">
                            <h4>{this.state.Synopsis.title}</h4>
                          </Col>
                        </FormGroup>
                        <br></br>
                        <br></br>
                        <FormGroup row>
                          <Col md="5">
                            <Label htmlFor="text-input">Synopsis File</Label>
                          </Col>
                          <Col xs="12" md="6" size="lg">
                            <Input type="file" onChange={this.onChange}></Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col xs="12" md="11">
                          <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit}
                           disabled={(this.state.Synopsis.status==="Registered")?false:true}
                           hidden={(this.state.Synopsis.status==="ReSubmit")?true:false}>
                              Upload Synopsis
                          </Button>
                          <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit} hidden={(this.state.Synopsis.status==="ReSubmit")?false:true}>
                              Re Submit Synopsis
                          </Button>
                          </Col>
                          <Col md="1">
                          </Col>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default SynopsisUpload;
