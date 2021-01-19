import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './containers/LADHome/Home';
import AboutUs from './containers/LADHome/about';
import Terms from './containers/LADHome/termsconditions';
import AdminLogin from './portals/Admin/Login';
import FacultyLogin from './portals/Faculty/Login'; 
import StudentLogin from './portals/Student/Login';
import StudentResigtration from './portals/Student/Registration';
import AdminDashboard from './portals/Admin/Admindashboard';
import FacultyPortal from './portals/Faculty/FacultyPortal';
import StudentPortal from './portals/Student/StudentPortal';
import FacultyProfile from './portals/Faculty/Profile';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" name="Home" component={Home}/>
            <Route exact path="/about" name="Home" component={AboutUs}/>
            <Route exact path="/terms" name="Home" component={Terms}/>
            <Route  path="/admin/login" name="Admin Login" component={AdminLogin} />
            <Route  path="/AdminDashboard" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/dashboard" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/profile" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/faculty/login" name="Faculty Login" component={FacultyLogin} />
            <Route  path="/faculty/confirmation/:token" name="Faculty profile" component={FacultyProfile} />
            <Route  path="/FacultyPortal" name="Faculty Portal" component={FacultyPortal}/>
            <Route  path="/student/login" name="Student Login" component={StudentLogin} />
            <Route  path="/student/registrtion" name="Student registration" component={StudentResigtration} />
            <Route  path="/StudentPortal" name="Student Portal" component={StudentPortal}/> 
          </Switch>
      </Router>    
           
    );
  }
}

export default App;

/*
 <Route  path="/student/login" name="Student Login" component={StudentLogin} />
            <Route  path="/student/registrtion" name="Student registration" component={StudentResigtration} />
            <Route  path="/faculty/login" name="Faculty Login" component={FacultyLogin} />
            <Route  path="/faculty/confirmation/:token" name="Faculty profile" component={FacultyProfile} />
            
            <Route  path="/AdminDashboard/reviewtask" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/comments" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/decisions" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/presentations" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/reports" name="Admin Dashboard" component={AdminDashboard}/>
            <Route  path="/AdminDashboard/notification" name="Admin Dashboard" component={AdminDashboard}/>
            
            <Route  path="/FacultyPortal" name="Faculty Portal" component={FacultyPortal}/>
    <Route  path="/StudentPortal" name="Student Portal" component={StudentPortal}/> 
    
    */