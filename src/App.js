import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'

import configureStore from './dataRedux/store'
import { BreakpointsProvider } from 'react-with-breakpoints';
import ReactGA from 'react-ga';
const trackingId = "UA-144360992-1"; 

ReactGA.initialize(trackingId);
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <div syle={{height:'100vh'}}>
        <ThemeProvider theme={theme}>
        <BreakpointsProvider>
          <Routes store={reduxStore}/>
          </BreakpointsProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
