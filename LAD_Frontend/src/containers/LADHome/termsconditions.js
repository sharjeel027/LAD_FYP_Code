import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Terms extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <header className="app-header navbar">
            <Header/>
        </header>
        <div className="app-body" >
          <h4>Terms Conditions</h4>
        </div>
        <footer className="app-footer">
            <Footer/>
        </footer>
      </div>
    );
  }
}

export default Terms;
