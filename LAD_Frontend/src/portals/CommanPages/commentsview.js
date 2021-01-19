import React, { Component, lazy, Suspense } from 'react';
import withAuth from '../withAuth';
import { Card, CardBody, FormGroup,Col,Form,Label, Progress } from 'reactstrap';
import axios from 'axios';
import { color } from '@amcharts/amcharts4/core';



class CommentsShow extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          comments:{}
        };
      }

    componentWillMount(){
        var id=this.props.match.params.id;
        axios.post('/api/faculty/getCommentsbyId',{id:id})
        .then(res=>{
            console.log(res);
            this.setState({
                comments:res.data.comment
            })

        })
        .catch(err=>{
            console.log(err);

        })
    }

  render() {

    return (
      <div className="animated fadeIn">
        
       <Card style={{width:'80%',marginLeft:'10%',marginTop:'5%'}}>
           <CardBody>
           <Form  className="form-horizontal">
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Submission Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <h5>{new Date(this.state.comments.submissionDate).toLocaleString()}</h5>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Comments</Label>
                    </Col>
                    <Col xs="12" md="9" >
                        <div style={{border:'1px solid black',width:'60%',padding:'15px'}}>
                            <h5 style={{color:'blue'}}>{this.state.comments.commenents}</h5>
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Comments File</Label>
                    </Col>
                    <Col xs="12" md="9">
                        {
                            (this.state.comments.filepath)? 
                            <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}} hidden={(this.state.comments.filepath)?false:true}>
                            <a href={"https://fyp-ssrs.herokuapp.com/"+this.state.comments.filepath} target="_blank"><i class="icon-cloud-download"></i></a>
                            </button>:<p>No File Atteched..!!!</p>
                        }
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Comments Status </Label>
                    </Col>
                    <Col xs="12" md="9">
                        <h5 className="badge badge-primary" style={{fontSize:'16px'}}>{this.state.comments.status}</h5>
                    </Col>
                </FormGroup>
            </Form>
           </CardBody>
       </Card>

      </div>
    );
  }
}

export default CommentsShow;
