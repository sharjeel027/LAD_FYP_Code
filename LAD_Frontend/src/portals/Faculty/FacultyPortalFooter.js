import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FacultyFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://lad.com.pk">LAD E-Learning</a> &copy; 2020 Lahore Institute of Animation and Design</span>
        <span className="ml-auto">Powered by <a href="https://lad.com.pk">Lahore Institute of Animation and Design</a></span>
      </React.Fragment>
    );
  }
}

FacultyFooter.propTypes = propTypes;
FacultyFooter.defaultProps = defaultProps;

export default FacultyFooter;
