import React, { Component } from "react";
import PropTypes from "prop-types";
import withAuth from "../withAuth";
// import Dashboard from './Dashboard';
// import AdminRoutes from '../../Routes/AdminRoutes'
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import Adminsidebar from "./AdminSideBar";

import AuthService from "../AuthTest";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./Dashboard";
import Student from "./student";
//import Synopsis from './synopsis';
import Faculty from "./faculty";
//import ReviewTask  from './reviewTask';
import ReviewComments from "./reviewComments";
//import SynopsisDecisions  from './synopsesDecision';
//import Presentation  from './Presentations';
//import Reports  from './Reports';
//import Notification  from './Notification';
import Profile from "./profile";
import FacultyRegistration from "./facultyRegistrationForm";
//import ReviewTaskForm from './ReviewTaskForm';
//import AddDecisionForm from './adddecisionform';
//import CommentsShow from '../CommanPages/commentsview';
import FacultyShow from "../CommanPages/facultyview";
import StudentShow from "../CommanPages/studentview";
import FaculityCourses from "./faculityCourses";
//import SynopsisShow from '../CommanPages/synopsisview';
//import CommentsAnalysis from './commentsAnalysisForm';

const propTypes = {
  children: PropTypes.node,
};

const Auth = new AuthService();

const defaultProps = {};

class AdminDashboard extends Component {
  componentWillMount() {
    console.log("fsfsfsdfds" + this.props.user.userType);
    localStorage.setItem("user_id", this.props.user.userId);
    if (this.props.user.userType !== "Admin") {
      alert("You can not access Admin Dashboard");
      Auth.logout();
      this.props.history.replace("/admin/login");
    }
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <Router>
        <div className="app header-fixed footer-fixed">
          <div>
            <header className="app-header navbar">
              <AdminHeader />
            </header>
            <div className="app-body ">
              <Adminsidebar />
              <main className="main">
                <Switch>
                  <Route
                    path="/AdminDashboard/studentShow/:id"
                    name="Student Show"
                    component={StudentShow}
                  />
                  <Route
                    path="/AdminDashboard/facultyShow/:id"
                    name="Faculty Show"
                    component={FacultyShow}
                  />

                  <Route
                    path="/AdminDashboard/dashboard"
                    name="Admin Dashboard"
                    component={Dashboard}
                  />
                  <Route
                    path="/AdminDashboard/student"
                    name="Students"
                    component={Student}
                  />

                  <Route
                    path="/AdminDashboard/faculty"
                    name="Faculty"
                    component={Faculty}
                  />
                  <Route
                    path="/AdminDashboard/comments"
                    name="Review Comments"
                    component={ReviewComments}
                  />

                  <Route
                    path="/AdminDashboard/Courses"
                    name="courses"
                    component={FaculityCourses}
                  />

                  <Route
                    path="/AdminDashboard/notification"
                    name="Notifications"
                    component={Notification}
                  />
                  <Route
                    path="/AdminDashboard/profile"
                    name="Profile"
                    component={Profile}
                  />
                  <Route
                    path="/AdminDashboard/facultyregistration"
                    name="Faculty Registration"
                    component={FacultyRegistration}
                  />

                  <Redirect
                    from="/AdminDashboard"
                    to="/AdminDashboard/dashboard"
                  />
                </Switch>
              </main>
            </div>
            <footer className="app-footer">
              <AdminFooter />
            </footer>
          </div>
        </div>
      </Router>
    );
  }
}

AdminDashboard.propTypes = propTypes;
AdminDashboard.defaultProps = defaultProps;

export default withAuth(AdminDashboard);

/*
 <Route  path="/AdminDashboard/commentShow/:id" name="Comments Show" component={CommentsShow} />
  <Route  path="/AdminDashboard/synopsisShow/:id" name="Synopsis Show" component={SynopsisShow} />
<Route  path="/AdminDashboard/reports" name="Reports"  component={Reports} />
 <Route  path="/AdminDashboard/addReviewtask/:synosisid" name="Faculty Registration"  component={ReviewTaskForm} />
<Route  path="/AdminDashboard/decisionsform/:synosisid" name="Synopsis Decision Form"  component={AddDecisionForm} />
<Route  path="/AdminDashboard/commentsAnalysis/:synosisid" name="Synopsis CommentsAnalysis Form"  component={CommentsAnalysis} />
 <Route  path="/AdminDashboard/reviewtask" name="Review Tasks"  component={ReviewTask} />
<Route  path="/AdminDashboard/decisions" name="Synopsis Decision"  component={SynopsisDecisions} />
<Route  path="/AdminDashboard/synopsis" name="Synopsis" component={Synopsis}/>


*/
