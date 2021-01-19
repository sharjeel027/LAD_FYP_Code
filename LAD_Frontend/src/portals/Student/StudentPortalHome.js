import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardColumns,
  Progress,
  Input,
} from "reactstrap";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
import nodataImage from '../../assets/img/nodata.png';
am4core.useTheme(am4themes_animated);

export default class StudentHome extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      synopsis:[],
      supervisor:{}
    };
  }

  componentDidMount(){
         
    var id=localStorage.getItem('user_id');
    axios.post('/api/student/getSynopsisbyId',{id:id})
    .then(res=>{
      console.log(res.data.data);
      this.setState({
        synopsis:res.data.data[0],
        supervisor:res.data.data[0].supervisor
      })
      var status=res.data.data[0].status
      let chart = am4core.create("chartdiv", am4charts.RadarChart);

        
        // Add data
        
        if(status==="Registering"){
          chart.data = [{
            "category": "Progress",
            "value": 10,
            "full": 100
          }];
        }
        else if(status==="Registered"){
          chart.data = [{
            "category": "Progress",
            "value": 15,
            "full": 100
          }];
        }
        else if(status==="ReSubmit"){
          chart.data = [{
            "category": "Progress",
            "value": 15,
            "full": 100
          }];
        }
        else if(status==="Submitted"){
          chart.data = [{
            "category": "Progress",
            "value": 20,
            "full": 100
          }];
        }else if(status==="UnderReview"){
          chart.data = [{
            "category": "Progress",
            "value": 30,
            "full": 100
          }];
        }else if(status==="Commented"){
          chart.data = [{
            "category": "Progress",
            "value": 50,
            "full": 100
          }];
        }else if(status==="Revised"){
          chart.data = [{
            "category": "Progress",
            "value": 60,
            "full": 100
          }];
        }else if(status==="PresentationSchedule"){
          chart.data = [{
            "category": "Progress",
            "value": 65,
            "full": 100
          }];
        }
        else if(status==="Presented"){
          chart.data = [{
            "category": "Progress",
            "value": 80,
            "full": 100
          }];
        }else if(status==="Approved"){
          chart.data = [{
            "category": "Progress",
            "value": 100,
            "full": 100
          }];
        }else if(status==="Rejected"){
          chart.data = [{
            "category": "Progress",
            "value": 1,
            "full": 100
          }];
        }
        

        // Make chart not full circle
        chart.startAngle = 180;
        chart.endAngle = 360;
        chart.innerRadius = am4core.percent(80);

        // Set number format
        chart.numberFormatter.numberFormat = "#.#'%'";

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 100;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = "left";
        categoryAxis.renderer.labels.template.disabled = true;
        categoryAxis.renderer.labels.template.verticalCenter = "bottom";

        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
          return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;

        // Create series
        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = "full";
        series1.dataFields.categoryY = "category";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "value";
        series2.dataFields.categoryY = "category";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;

        if(status==="Registering" || status==="Registered" || status==="ReSubmit"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#c450d8");
          });
        }
        else if(status==="Submitted"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#2196f3");
          });
        }else if(status==="UnderReview"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#9aa531");
          });
        }else if(status==="Commented"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#9aa531");
          });
        }else if(status==="Revised"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#3c3cc7");
          });
        }
        else if(status==="PresentationSchedule"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#3c3cc7");
          });
        }else if(status==="Presented"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#3c3cc7");
          });
        }else if(status==="Approved"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#008000");
          });
        }else if(status==="Rejected"){
          series2.columns.template.adapter.add("fill", function(fill, target) {
            return am4core.color("#B00100");
          });
        }
        



        // Add cursor
        chart.cursor = new am4charts.RadarCursor();

    this.chart = chart;
    })
    .catch(err=>{
      console.log(err);
     })
  
    
  }

  componentWillMount(){
    if (this.chart) {
      this.chart.dispose();
    }

  }
  
  render() {
    console.log(this.state.supervisor);
    return (
      <div>
        <Card style={{ width: "70%", marginLeft: "10%", marginTop: "2%" }}>
          <CardBody>
          <div className="row">
            <div className="col-md-12">
              <h4>Course Title:</h4>
              <h4 style={{color:'blue'}}>{(this.state.synopsis)?this.state.synopsis.title:'NIL'}</h4>
              <br></br>
              <h5>Status:</h5>
              <h5 style={{color:'green'}}>{(this.state.synopsis)?this.state.synopsis.status:'Please Register synopsis'}</h5>
              <br></br>
              <h4>Instructor Name:</h4>
              <h4 style={{color:'blue'}}>{(this.state.supervisor)?(this.state.supervisor.fname)+" "+(this.state.supervisor.lname):'NIL'}</h4>
              <br></br>
              <h5>Instructor Email:</h5>
              <h5 style={{color:'green'}}>{(this.state.supervisor)?this.state.supervisor.email:'NIL'}</h5>
            </div>
            <div className="col-md-6">
            <br></br>
            <br></br>
            <h5>Progress:</h5>
            <br></br>
            {(this.state.synopsis)? <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>:
              <img src={nodataImage} width="80%" height="300px"></img>
            }
            </div>
            
          </div>
          
          </CardBody>
        </Card>
      </div>
    );
  }
}
