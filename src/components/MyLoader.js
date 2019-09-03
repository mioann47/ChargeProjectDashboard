
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { css } from '@emotion/core';
import {
    BounceLoader
} from 'react-spinners';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const gif = require('../images/loading-gif.gif');
export default class MyLoader extends Component {
    render() {
        return (

            this.props.loading ? 
            <div style={{ height: 500,display: 'flex',  justifyContent:'center', alignItems:'center' }}>
                <img src={gif} alt="loading..." />
           
                </div>
                : <></>
            /*<BounceLoader

                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.props.loading}
            />*/
        )
    }
}
MyLoader.propTypes = {
    loading: PropTypes.bool.isRequired
};