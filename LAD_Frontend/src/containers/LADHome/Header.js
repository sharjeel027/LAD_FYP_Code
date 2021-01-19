import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {AppNavbarBrand} from '@coreui/react';
import logo from '../../assets/img/brand/comsatslogo.jpg';
import sygnet from '../../assets/img/brand/comsatslogo.jpg';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class LADHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          //full={{ src: logo, width: 40, height: 30, alt: 'CoreUI Logo' }}
          //minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }} style={{width:'80px'}}
        />
        <h4 style={{color:"#375173",position:"absolute",left:"4%"}}><strong>LAD E-Learning</strong></h4>
        <Nav navbar >
          <NavItem className="px-3">
            <NavLink to="/" className="nav-link" >Home</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/about" className="nav-link">About</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/terms" className="nav-link">Term & Conditions</Link>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}
 LADHeader.propTypes = propTypes; LADHeader.defaultProps = defaultProps;

export default LADHeader;
