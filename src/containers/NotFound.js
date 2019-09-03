import React from "react";
import { Link, withRouter } from 'react-router-dom';

export default () =>
  <div style={{ paddingTop: '100px', textAlign: 'center' }}>
    <h3>Sorry, page not found!</h3>
    <Link to='/' style={{
      textDecoration: 'none',
      color: 'inherit'
    }}>

      <span className={{
        display: 'inline-block',
      }}>Click here to return to homepage</span>
    </Link>
  </div>;