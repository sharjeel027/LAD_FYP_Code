import React, { Component, lazy, Suspense } from 'react';
import withAuth from '../withAuth';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';
import welcome from '../../assets/img/welcome.jpg';


class Home extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        
       <div>
         <img src={welcome} width="70%" style={{marginTop:'4%',marginLeft:'15%'}}/>
       </div>

      </div>
    );
  }
}

export default withAuth(Home);
