import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/comsatslogo.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class LADFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="http://www.lad.com.pk/">LAD E-Learning System</a> &copy; 2020 Lahore Institute of Animation and Design.</span>
        <span className="ml-auto">Powered by <a href="http://www.lad.com.pk/">Lahore Institute of Animation and Design</a></span>  
      </React.Fragment>
    );
  }
}

LADFooter.propTypes = propTypes;
LADFooter.defaultProps = defaultProps;

export default LADFooter;
