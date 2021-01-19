import React, { Component } from "react";
import PropTypes from "prop-types";
import withAuth from "../withAuth";
import Home from "./Home";
import FacultyHeader from "./FacultyPortalHeader";
import FacultyFooter from "./FacultyPortalFooter";
import FacultySideBar from "./FacultyPortalSideBar";
//import Decision from './decisions';
//import Notification from './notifications';
//import Presentation from './Presentations';
import FacultyProfileShow from "./showprofile";
import FacultyProfileUpdate from "./updateprofile";
import ReviewComments from "./reviewComments";
import ReviewTask from "./reviewTask";
import RecivedAssign from "./recievedAss";
import Student from "./students";
//import SubmitReviewForm from './submitReviewComment';
//import Synopsis from './synopses';
//import SynopsisShow from '../CommanPages/synopsisview';
import StudentShow from "../CommanPages/studentview";
import AuthService from "../AuthTest";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GoLive from "./GoLive";
import Addno from "./number";

const propTypes = {
  children: PropTypes.node,
};

const Auth = new AuthService();

const defaultProps = {};

class FacultyPortal extends Component {
  componentWillMount() {
    console.log("fsfsfsdfds" + this.props.user.userType);
    localStorage.setItem("user_id", this.props.user.userId);
    localStorage.setItem("isReviewer", this.props.user.isReviewer);
    localStorage.setItem("isSupervisor", this.props.user.isSupervisor);
    if (this.props.user.userType !== "Faculty") {
      alert("You can not access Faculty Portal");
      Auth.logout();
      this.props.history.replace("/faculty/login");
    }
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    console.log(this.props.user.email);

    return (
      <Router>
        <body className="app header-fixed footer-fixed">
          <div>
            <header className="app-header navbar">
              <FacultyHeader />
            </header>
            <div className="app-body ">
              <FacultySideBar />
              <main className="main">
                <Switch>
                  <Route
                    path="/FacultyPortal/Home"
                    name="Faculty Portal Home Page"
                    component={Home}
                  />

                  <Route
                    path="/FacultyPortal/Notification"
                    name="Faculty Portal Home Page"
                    component={Notification}
                  />
                  <Route
                    path="/FacultyPortal/Presentation"
                    name="Faculty Portal Home Page"
                    component={Presentation}
                  />
                  <Route
                    path="/FacultyPortal/Profile"
                    name="Faculty Portal Home Page"
                    component={FacultyProfileShow}
                  />
                  <Route
                    path="/FacultyPortal/ProfileUpdate"
                    name="Faculty Portal Home Page"
                    component={FacultyProfileUpdate}
                  />

                  <Route
                    path="/FacultyPortal/Student"
                    name="Faculty Portal Home Page"
                    component={() => <Student data={this.props.user} />}
                  />

                  <Route
                    path="/FacultyPortal/RevivedAssignments"
                    name="Faculty Portal Home Page"
                    component={() => <RecivedAssign data={this.props.user} />}
                  />
                  <Route
                    path="/FacultyPortal/live"
                    name="live"
                    component={() => <GoLive data={this.props.user} />}
                  />
                  <Route
                    path="/FacultyPortal/ReviewComments"
                    name="Faculty Portal Home Page"
                    component={() => <ReviewComments data={this.props.user} />}
                  />
                  <Route
                    path="/FacultyPortal/AddAssign"
                    name="Faculty Portal Home Page"
                    component={() => <ReviewTask data={this.props.user} />}
                  />

                  <Route
                    path="/FacultyPortal/addAssignemtno"
                    name="Faculty Portal Home Page"
                    component={() => <Addno data={this.props.user} />}
                  />

                  <Route
                    path="/FacultyPortal/ViewStudent/:id"
                    name="Faculty Portal Home Page"
                    component={StudentShow}
                  />
                  <Redirect from="/FacultyPortal" to="/FacultyPortal/Home" />
                </Switch>
              </main>
            </div>
            <footer className="app-footer">
              <FacultyFooter />
            </footer>
          </div>
        </body>
      </Router>
    );
  }
}

FacultyPortal.propTypes = propTypes;
FacultyPortal.defaultProps = defaultProps;

export default withAuth(FacultyPortal);

/*
<Route  path="/FacultyPortal/Decisions" name="Faculty Portal Home Page" component={Decision} />
<Route  path="/FacultyPortal/SubmitReviewForm/:taskId/:synopsisId" name="Faculty Portal Home Page" component={SubmitReviewForm} />
<Route  path="/FacultyPortal/Synopsis" name="Faculty Portal Home Page" component={Synopsis} />
<Route  path="/FacultyPortal/ViewSynopsis/:id" name="Faculty Portal Home Page" component={SynopsisShow} />
                


*/
