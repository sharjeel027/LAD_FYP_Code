import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Adminsidebar extends Component {
  // constructor(props) {
  //     super(props);

  //     this.toggle = this.toggle.bind(this);
  //     this.state = {
  //       dropdownOpen: [false, false],
  //     };
  //   }

  //   toggle(i) {
  //     const newArray = this.state.dropdownOpen.map((element, index) => {
  //       return (index === i ? !element : false);
  //     });
  //     this.setState({
  //       dropdownOpen: newArray,
  //     });
  //   }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebar fixed display="lg">
          <AppSidebarHeader></AppSidebarHeader>
          <AppSidebarForm></AppSidebarForm>
          <AppSidebarNav>
            <Nav>
              <NavItem>
                <Link to={"/AdminDashboard"} className="nav-link">
                  <i className="nav-icon icon-home"></i>Dashboard
                </Link>
              </NavItem>
              <NavItem>
                <Link to={"/AdminDashboard/student"} className="nav-link">
                  <i className="nav-icon icon-graduation"></i> Students
                </Link>
              </NavItem>
              <NavItem>
                <Link to={"/AdminDashboard/Courses"} className="nav-link">
                  <i className="nav-icon icon-docs"></i> Courses
                </Link>
              </NavItem>
              <NavItem>
                <Link to={"/AdminDashboard/faculty"} className="nav-link">
                  <i className="nav-icon icon-people"></i> Faculty
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to={"/AdminDashboard/facultyregistration"}
                  className="nav-link"
                >
                  <i className="nav-icon icon-people"></i>Register Faculty
                </Link>
              </NavItem>
              {/* <NavItem>
                <Link to={"/AdminDashboard/reviewtask"} className="nav-link">
                  <i className="nav-icon icon-layers"></i> Review Course
                </Link>
              </NavItem> */}
              <NavItem>
                <Link to={"/AdminDashboard/comments"} className="nav-link">
                  <i className="nav-icon icon-speech"></i> Review Feedback
                </Link>
              </NavItem>
            </Nav>
          </AppSidebarNav>
          <AppSidebarMinimizer />
        </AppSidebar>
        {/* <div className="sidebar ">
                    <nav className="sidebar-nav">
                        <ul className="nav">
                        <li className="nav-title">Operations</li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Students
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Synopses
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Faculty
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Synopses Review Task
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Review Comments
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Synopses Decisions
                            </a>
                        </li>
    
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <i className="nav-icon cui-speedometer"></i> Presentation Schedule
                            </a>
                        </li>
                        <li className="nav-item nav-dropdown">
                            <a className="nav-link nav-dropdown-toggle" href="#">
                            <i className="nav-icon cui-puzzle"></i> Reports
                            </a>
                            <ul className="nav-dropdown-items">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                <i className="nav-icon cui-puzzle"></i> Synopsis Reports
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                <i className="nav-icon cui-puzzle"></i> 
                                </a>
                            </li>
                            </ul>
                        </li>
                        </ul>
                    </nav>
                    <button className="sidebar-minimizer brand-minimizer" type="button"></button>
                    </div> */}
      </React.Fragment>
    );
  }
}

Adminsidebar.propTypes = propTypes;
Adminsidebar.defaultProps = defaultProps;

export default Adminsidebar;

/*<Link to={'/AdminDashboard/synopsis'} className="nav-link"><i className="nav-icon icon-docs"></i> Synopses</Link>
<Link to={'/AdminDashboard/decisions'} className="nav-link"><i className="nav-icon icon-hourglass"></i> Decisions</Link>
<Link to={'/AdminDashboard/presentations'} className="nav-link"><i className="nav-icon cui-speedometer"></i> Report Card Generation</Link>
<Link to={'/AdminDashboard/reports'} className="nav-link"><i className="nav-icon icon-notebook"></i> Payment</Link>

*/
