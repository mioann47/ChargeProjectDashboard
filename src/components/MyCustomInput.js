import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class MyCustomInput extends React.Component {

    render () {
      return (
        <Button variant="outlined" color="primary" className={this.props.className}

          style={{borderWidth:2,borderColor:"#3F51B5",fontWeight:'bold'}}
          onClick={this.props.onClick}>
          {this.props.value}
        </Button>
      )
    }
  }
  
  MyCustomInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
  };

  export default MyCustomInput