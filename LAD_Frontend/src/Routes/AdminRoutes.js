import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../portals/Admin/Dashboard';
import Student from '../portals/Admin/Dashboard';
import Synopsis from '../portals/Admin/Dashboard';
import Faculty  from '../portals/Admin/Dashboard';
import ReviewTask  from '../portals/Admin/Dashboard';
import ReviewComments from '../portals/Admin/Dashboard';
import SynopsisDecisions  from '../portals/Admin/Dashboard';
import Presentation  from '../portals/Admin/Dashboard';
import Reports  from '../portals/Admin/Dashboard';

export default class AdminRoutes extends Component{

  render(){
    return(
      <React.Fragment>
        <Route  path="/admin/dashboard" name="Admin Dashboard" component={Dashboard} />
        <Route  path="/admin/student" name="Students" component={Student}/>
        <Route  path="/admin/synopsis" name="Synopsis" component={Synopsis}/>
        <Route  path="/admin/faculty" name="Faculty" component={Faculty}/>
        <Route  path="/admin/reviewtask" name="Review Tasks"  component={ReviewTask} />
        <Route  path="/admin/comments" name="Review Comments"  component={ReviewComments} />
        <Route  path="/admin/decisions" name="Synopsis Decision"  component={SynopsisDecisions} />
        <Route  path="/admin/presentations" name="Prsentation" component={Presentation} />
        <Route  path="/admin/reports" name="Reports"  component={Reports} />
      </React.Fragment>
    )
  }
 // <Route  path="/admin/dashboard" name="Admin Dashboard" component={Dashboard} />

}