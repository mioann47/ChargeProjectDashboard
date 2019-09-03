import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';
//import * as WebDataRocksReact from '../components/pivotTable/webdatarocks.react';
import Grid from '@material-ui/core/Grid';
import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import * as stitch from '../components/stitch'
import { css } from '@emotion/core';
import { BounceLoader
} from 'react-spinners';
import * as FlexmonsterReact from 'react-flexmonster';
import MyLoader from '../components/MyLoader'
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const backgroundShape = require('../images/shape.svg');
const background = require('../images/backgroundCharge.jpg');
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundSize: 'cover',
    background: `url(${background})`,
    backgroundColor:'black',
    height:'95vh'
  },
  grid: {
    width: '90%',
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});


const DataTypes = {
  "Date": {
    type: "level",
    hierarchy: "DATE"
  },
  "Time": {
    type: "level",
    hierarchy: "DATE",
    level: "Time",
    parent: "Date"
  },
  "BatteryPowerIn": { "type": "number" },
  "BatteryPowerOut": { "type": "number" },
  "BatteryCurrent": { "type": "number" },
  "USBHubCurrent": { "type": "number" },
  "BatteryVoltage": { "type": "number" },
  "Temperature": { "type": "number" },
  "Humidity": { "type": "number" },
  "PanelCurrent": { "type": "number" },
  "Irradiance": { "type": "number" },

};

const Formats = [
  {
    "name": "",
    "thousandsSeparator": ",",
    "decimalSeparator": ".",
    "decimalPlaces": 2,
    "maxSymbols": 20,
    "nullValue": " ",
    "infinityValue": "Infinity",
    "divideByZeroValue": "Infinity"
  }
]

const Slice = {
  rows: [
    {
      "uniqueName": "DATE"
    }
  ],
  "columns": [
    {
      "uniqueName": "Measures"
    }
  ],
  "measures": [
    {
      "uniqueName": "BatteryPowerIn",
      "aggregation": "sum"
    },
    {
      "uniqueName": "BatteryCurrent",
      "aggregation": "sum"
    },
    {
      "uniqueName": "BatteryPowerOut",
      "aggregation": "sum"
    },
    {
      "uniqueName": "BatteryVoltage",
      "aggregation": "sum"
    },
    {
      "uniqueName": "Humidity",
      "aggregation": "sum"
    },
    {
      "uniqueName": "Irradiance",
      "aggregation": "sum"
    },
    {
      "uniqueName": "PanelCurrent",
      "aggregation": "sum"
    },
    {
      "uniqueName": "Temperature",
      "aggregation": "sum"
    },
    {
      "uniqueName": "USBHubCurrent",
      "aggregation": "sum"
    }
  ]
}

class DataReporting extends Component {

  constructor() {
    super();
    this.state = {
      learnMoredialog: false,
      getStartedDialog: false,
      dataLoaded: false,
      data: null,
    };
    this.loadFromStitch = this.loadFromStitch.bind(this)
  }

  loadFromStitch() {
    stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
      stitch.db.collection("data5").find({}, { sort: { Datetime: 1 } }).asArray()
        .then(items => {
          this.setState({ data: items, dataLoaded: true })
        })
    )
  }



  async componentDidMount() {
    try {
      if (!this.state.dataLoaded) {
        this.loadFromStitch();
      }
    } catch (e) {
      console.log(e)
    }
  }










  
  customizeToolbar = (toolbar) => {
    var tabs = toolbar.getTabs(); // get all tabs from the toolbar
    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      return tabs;
    }
  }
  getJSONData() {
    var x = this.state.data
    x.unshift(DataTypes);
    return x
  }












  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
        {
          (this.state.data) ?
            <Grid container justify="center">
              <Grid spacing={1} alignItems="center" justify="center" container className={classes.grid}>
                <FlexmonsterReact.Pivot
                componentFolder="https://cdn.flexmonster.com/"
                  toolbar={true} height={700} licenseKey={'Z76O-XB0271-1W2H5N-4R2N1K'}
                  report={{
                    dataSource: {
                      dataSourceType: "json",
                      data: this.getJSONData(),

                    },
                    slice: Slice,
                    formats: Formats
                  }}
                  beforetoolbarcreated={this.customizeToolbar}
                />
              </Grid>
            </Grid>
            : <Grid container justify="center">
              <Grid spacing={1} alignItems="center" justify="center" container className={classes.grid}>

              <MyLoader loading={true} />
              </Grid>
            </Grid>
        }
  </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(DataReporting));
