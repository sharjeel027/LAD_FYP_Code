import React, { Component } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,Label,
    Row,
    } from 'reactstrap';
class CommentsAnalysis extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300,
          synopsis:[],
          supervisor:[],
          comments:[],
          decision1:'1',
          decision2:'1',
          decision3:'1',
        };

      
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState }});
      }
      
      onChange(e){
        
        this.setState({[e.target.name]: e.target.value});
      }

      onSubmit(e){

        e.preventDefault();
        var final=0;
        var finaldecision="Revised";
        console.log("d1"+this.state.decision1+"d2"+this.state.decision2+"d3"+this.state.decision3)
        if(this.state.decision1==='1'){
            final++;
        }
        if(this.state.decision2==='1'){
            final++;
        }
        if(this.state.decision3==='1'){
            final++;
        }

        if(final<2){
            finaldecision="ReSubmit";
        }
        
        let Synid = this.props.match.params.synosisid;
        const data={

          id:Synid,
          status:finaldecision,
        }

        console.log(data);

        

        axios.post('/api/synopsis/ChangeStatus',data)
        .then(res=>{
          console.log(res);
          axios.post('/api/admin/Notify',
          {
            userId:this.state.synopsis.supervisor._id,
            subject: "Synopsis \""+this.state.synopsis.title+"\"'s comments analyzed by the admin and his decision is "+finaldecision,
            status:"unreaded"
          })
          .then(result=>{
            axios.post('/api/admin/Notify',
            {
              userId:this.state.synopsis.student._id,
              subject: "Your Synopsis has been reviewed and comments forwarded to Your Supervisor and Admin decision on comments is. "+finaldecision,
              status:"unreaded"
            })
            .then(result=>{
            })
            .catch(err=>{
              console.log(err);
            })
          })
          .catch(err=>{
            console.log(err);
          })
          alert(res.data.message);
          this.props.history.replace('/AdminDashboard');
        })
        .catch(err=>{
          console.log(err);
        });

      }
      


      componentWillMount(){
        let Synid = this.props.match.params.synosisid;

        axios.post('/api/synopsis/getbyId',{id:Synid})
        .then(res=>{
          console.log(res.data);
          this.setState({synopsis:res.data.data})
          this.setState({supervisor:res.data.data.supervisor,
            comments:res.data.data.commenents});
        })
        .catch(err=>{
          console.log(err);
        })
      }
    
  render() {
    
    return (
        <div>
          <Card style={{width:'70%',marginLeft:"15%",marginTop:'2%',}}>
              <CardHeader>
                <h4>Comments Analysis Form</h4>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Synopsis Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.synopsis.title}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Research Field</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{(this.state.synopsis.researchField)?this.state.synopsis.researchField:'No'}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Supervisor</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.supervisor.fname+" "+this.state.supervisor.lname}</p>
                    </Col>
                  </FormGroup>
                  {this.state.comments.map((comment,index)=>
                  <div key={index}>
                    <div style={{width:'80%',border:'1px solid black',padding:'15px',margin:'10px',marginLeft:'10%',textAlign:'center'}}>
                    <h4>Comments By Reviewer {index+1}</h4>
                      <p style={{color:'blue'}}>{(comment.commenents)?comment.commenents:'Please download the file by clicking the below button'}</p>
                      <button type="button" class="btn btn-outline-success" style={{marginRight:'10px'}} hidden={(comment.filepath)?false:true}>
                        <i class="icon-cloud-download"></i>
                      </button>
                      <h5>Analysis Result: {(index===2)?<span className="badge badge-danger">Negative</span>:<span className="badge badge-success">Positive</span>}</h5>
                      <br></br>
                      <FormGroup row>
                        <Col md="3">
                          <Label>Decision</Label>
                        </Col>
                        <Col xs="6" md="3" size="lg">
                          <Input type="select" name={"decision"+(index+1)} id={"decision"+(index+1)} onChange={this.onChange} >
                            <option value="1">Accepted</option>
                            <option value="0">ReSubmit</option>
                        </Input>
                        </Col>
                      </FormGroup>
                    </div>
                  </div>
                  )}
                </Form>
              </CardBody>
              <CardFooter>
                <div style={{float:'right'}}>
                <Button color="ghost-success" style={{float:'right'}} onClick={this.onSubmit}>
                    <i className="icon-check"></i>&nbsp;Add Decision
                </Button>
                </div>
              </CardFooter>
            </Card>  
        </div>
    );
  }
}
export default CommentsAnalysis;