import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ReactComponent as PowerSvg } from '../images/powerIcon.svg';
import { ReactComponent as VoltageSvg } from '../images/voltage.svg';
import { ReactComponent as TempSvg } from '../images/temp.svg';
import { ReactComponent as HumiditySvg } from '../images/humidity.svg';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import ACTIONS from "../dataRedux/action";
import _ from "lodash";


import ReactGA from 'react-ga';

import BarChartIcon from '@material-ui/icons/BarChart'
import ListIcon from '@material-ui/icons/List'


import DailyBatterPowerGrid from '../components/Grids/DailyBatteryPowerGrid'
import DailyBatteryVoltageGrid from '../components/Grids/DailyBatteryVoltageGrid'
import DailyCurrentsGrid from '../components/Grids/DailyCurrentsGrid'
import DailyIrradianceGrid from '../components/Grids/DailyIrradianceGrid'
import DailyTemperatureGrid from '../components/Grids/DailyTemperatureGrid'
import DailyHumidityGrid from '../components/Grids/DailyHumidityGrid'

import MonthlyBatteryPowerGrid from '../components/Grids/MonthlyBatteryPowerGrid'
import MonthlyBatteryVoltageGrid from '../components/Grids/MonthlyBatteryVoltageGrid'
import MonthlyTemperatureGrid from '../components/Grids/MonthlyTemperatureGrid'
import MonthlyHumidityGrid from '../components/Grids/MonthlyHumidityGrid'
import MonthlyCurrentsPowerGrid from '../components/Grids/MonthlyCurrentsPowerGrid'
import MonthlyIrradianceGrid from '../components/Grids/MonthlyIrradianceGrid'

import YearlyBatteryPowerGrid from '../components/Grids/YearlyBatteryPowerGrid'
import YearlyBatteryVoltageGrid from '../components/Grids/YearlyBatteryVoltageGrid'
import YearlyTemperatureGrid from '../components/Grids/YearlyTemperatureGrid'
import YearlyHumidityGrid from '../components/Grids/YearlyHumidityGrid'
import YearlyCurrentsPowerGrid from '../components/Grids/YearlyCurrentsPowerGrid'
import YearlyIrradianceGrid from '../components/Grids/YearlyIrradianceGrid'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { List } from '@material-ui/core';
import MyCustomInput from '../components/MyCustomInput'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import * as ApiMisc from '../components/utils/ApiMisc'

const background = require('../images/backgroundCharge.jpg');
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundSize: 'cover',
    background: `url(${background})`,
    backgroundColor: 'black',
    minHeight: '100vh',
    paddingBottom: 70
  },
  group: {
    margin: theme.spacing(0),
  },
  formControl: {
    margin: 5,
  },
  button: {
    width: 150,
    margin: theme.spacing(1),
  },
  grid: {
    width: '95%',
  },
  paper: {
    marginTop: 20,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(255, 255,255, 1)'
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
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
  },
  icon: {
    fontSize: '3rem',
    height: '3rem',
    width: '3rem'
  },
  topCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  topCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelOptionStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

let showing = 1
let selectedGraphsCount = 0
class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {

      combined: false,
      combined2: true,
      hide: false,
      period: _.cloneDeep(this.props.options.period),
      charts: _.cloneDeep(this.props.options.charts),
      backgroundHide: 'rgba(255, 255,255, 1)',
      showing: showing,
      showingCharts: false,
      selectedGraphsCount: selectedGraphsCount,
      year: 2017,
      topBatteryIn:null,
      topBatteryOut:null,
      topTemp7:null,
      topHum7:null,
    };



    this.batteryPowerRef = React.createRef();
    this.batteryVoltageRef = React.createRef();
    this.currentsRef = React.createRef();
    this.irradianceRef = React.createRef();
    this.temperatureRef = React.createRef();
    this.humidityRef = React.createRef();

    this.handleGoogleAnalytics = this.handleGoogleAnalytics.bind(this)
    this.handleShowCharts = this.handleShowCharts.bind(this)
    this.LoadCharts = this.LoadCharts.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.handleActionsOnCharts = this.handleActionsOnCharts.bind(this)
    this.handleCombineChart = this.handleCombineChart.bind(this)
  }

  async componentDidMount() {

    const topBatteryIn=await ApiMisc.loadBatteryPowerInSum()
    const topBatteryOut=await ApiMisc.loadBatteryPowerOutSum()

    const topTemp7= await ApiMisc.loadTempLast7Days('2017-02-10','2017-02-17')
    const topHum7 = await ApiMisc.loadHumidityLast7Days('2017-02-10','2017-02-17')
    this.setState({topBatteryIn,topBatteryOut,topTemp7,topHum7})

  }


  componentWillUnmount() {
    showing = this.state.showing;
    selectedGraphsCount = this.state.selectedGraphsCount
  }




  renderTopRow(classes) {
    return (
      <Grid container spacing={4} alignItems="center" justify="center" item >
        <Grid item xs={6} md={5} lg={3} sm={6} xl={3} >
          {<Card className={classes.paper}>
            <VoltageSvg className={classes.icon} />
            <Typography color='secondary' variant="body2" gutterBottom className={classes.topCardTitle}>
              Total Battery Power In
          </Typography>

            <Typography
              className={classes.topCardValue}
            >
              {this.state.topBatteryIn?this.state.topBatteryIn+' kWh':'Loading...'}
          </Typography>

          </Card>}
        </Grid>
        <Grid item xs={6} md={5} lg={3} sm={6} xl={3} >
          {<Card className={classes.paper}>
            <PowerSvg className={classes.icon} />
            <Typography color='secondary' variant="body2" gutterBottom className={classes.topCardTitle}>
              Total Battery Power Out
          </Typography>

            <Typography
              className={classes.topCardValue}>
               {this.state.topBatteryOut?this.state.topBatteryOut+' kWh':'Loading...'}
          </Typography>

          </Card>}
        </Grid>

        <Grid item xs={6} md={5} lg={3} sm={6} xl={3} >
          {<Card className={classes.paper}>
            <TempSvg className={classes.icon} />
            <Typography color='secondary' variant="body2" gutterBottom className={classes.topCardTitle}>
              Temperature (last 7 days)
          </Typography>

            <Typography
              className={classes.topCardValue}>
              {this.state.topTemp7?this.state.topTemp7+'°C':'Loading...'}
          </Typography>

          </Card>}
        </Grid>
        <Grid item xs={6} md={5} lg={3} sm={6} xl={3} >
          {<Card className={classes.paper}>
            <HumiditySvg className={classes.icon} />
            <Typography color='secondary' variant="body2" gutterBottom className={classes.topCardTitle}>
              Humitidy (last 7 days)
          </Typography>

            <Typography
              className={classes.topCardValue}>
              {this.state.topHum7?this.state.topHum7+'% H':'Loading...'}
          </Typography>

          </Card>}
        </Grid>
      </Grid>
    )
  }






  handleGoogleAnalytics(Category, Action) {
    ReactGA.event({
      category: Category,
      action: Action,
    });


  }




  handleChooseChart(event) {
    let charts = this.state.charts
    charts[event.target.value] = event.target.checked
    this.setState({ charts: charts })
  }

  handleApplyFilter() {
    const { period, charts } = this.props.options

    if (period === 'Daily') {
      this.handleGoogleAnalytics('Date', 'Show Daily data from '+this.props.dates.start+' to '+this.props.dates.end)
      if (charts.BatteryPower) {
        this.batteryPowerRef.handleLoadData()
      }
      if (charts.BatteryVoltage) {
        this.batteryVoltageRef.handleLoadData()
      }
      if (charts.Current) {
        this.currentsRef.handleLoadData()
      }
      if (charts.Irradiance) {
        this.irradianceRef.handleLoadData()
      }
      if (charts.Temperature) {

        this.temperatureRef.handleLoadData()
      } if (charts.Humidity) {
        this.humidityRef.handleLoadData()
      }

    } else if (period === 'Monthly') {
      const value = this.state.year
      this.handleGoogleAnalytics('Date', 'Show Monthly data for '+value)
      if (charts.BatteryPower) {
        this.batteryPowerRef.handleLoadData(value)
      }
      if (charts.BatteryVoltage) {
        this.batteryVoltageRef.handleLoadData(value)
      }
      if (charts.Current) {
        this.currentsRef.handleLoadData(value)
      }
      if (charts.Irradiance) {
        this.irradianceRef.handleLoadData(value)
      }
      if (charts.Temperature) {

        this.temperatureRef.handleLoadData(value)
      } if (charts.Humidity) {
        this.humidityRef.handleLoadData(value)
      }/**/

    } else if (period === 'Yearly') {

      if (charts.BatteryPower) {
        this.batteryPowerRef.handleLoadData()
      }
      if (charts.BatteryVoltage) {
        this.batteryVoltageRef.handleLoadData()
      }
      if (charts.Current) {
        this.currentsRef.handleLoadData()
      }
      if (charts.Irradiance) {
        this.irradianceRef.handleLoadData()
      }
      if (charts.Temperature) {

        this.temperatureRef.handleLoadData()
      } if (charts.Humidity) {
        this.humidityRef.handleLoadData()
      }

    }
  }

  handleActionsOnCharts(num) {

    this.setState({ showing: num })

    const { period, charts } = this.props.options

    if (period === 'Daily') {

      if (charts.BatteryPower) {
        this.batteryPowerRef.handleChangeChart(num)
        this.handleGoogleAnalytics('Action', num===1?'Show Daily Battery Power Per Hour':'Show Daily Total Battery Power')
      }
      if (charts.BatteryVoltage) {

      }
      if (charts.Current) {
        this.currentsRef.handleChangeChart(num)
        this.handleGoogleAnalytics('Action', num===1?'Show Daily USB/Panel/Battery Current Per Hour':'Show Daily Total USB/Panel/Battery Current')
      }
      if (charts.Irradiance) {
      }
      if (charts.Temperature) {
        this.temperatureRef.handleChangeChart(num)
        this.handleGoogleAnalytics('Action', num===1?'Show Daily Temperature Per Hour':'Show Daily Average Temperature')
      }
      if (charts.Humidity) {
        this.humidityRef.handleChangeChart(num)
        this.handleGoogleAnalytics('Action', num===1?'Show Daily Humidity Per Hour':'Show Daily Average Humidity')
      }

    } else if (period === 'Monthly') {

      if (charts.BatteryPower) {
        this.batteryPowerRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly Battery Power by '+num)
      }
      if (charts.BatteryVoltage) {
        this.batteryVoltageRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly Battery Voltage by '+num)
      }
      if (charts.Current) {
        this.currentsRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly USB/Panel/Battery Current by '+num)
      }
      if (charts.Irradiance) {
        this.irradianceRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly Irradiance by '+num)
      }
      if (charts.Temperature) {
        this.temperatureRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly Temperature by '+num)
      }
      if (charts.Humidity) {
        this.humidityRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Monthly Humidity by '+num)
      }

    } else if (period === 'Yearly') {

      if (charts.BatteryPower) {
        this.batteryPowerRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly Battery Power by '+num)
      }
      if (charts.BatteryVoltage) {
        this.batteryVoltageRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly Battery Voltage by '+num)
      }
      if (charts.Current) {
        this.currentsRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly USB/Panel/Battery Current by '+num)
      }
      if (charts.Irradiance) {
        this.irradianceRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly Irradiance by '+num)
      }
      if (charts.Temperature) {
        this.temperatureRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly Temperature by '+num)
      }
      if (charts.Humidity) {
        this.humidityRef.handleSort(num)
        this.handleGoogleAnalytics('Action', 'Sort Yearly Humidity by '+num)
      }

    }
  }

  handleCombineChart(val) {





    const { period, charts } = this.props.options

    if (period === 'Daily') {
      this.setState({ combined: val, })
      if (charts.BatteryPower) {
        this.batteryPowerRef.handleCombine(val)
        this.handleGoogleAnalytics('Combine/Split', 'Battery Power')
      }
      if (charts.BatteryVoltage) {

      }
      if (charts.Current) {
        this.currentsRef.handleCombine(val)
        this.handleGoogleAnalytics('Combine/Split', 'USB/Panel/Battery Current')
      }
      if (charts.Irradiance) {

      }
      if (charts.Temperature) {

      }
      if (charts.Humidity) {

      }

    } else if (period === 'Monthly') {
      this.setState({ combined: val === 'combine' ? true : false, })
      const value = this.state.year
      if (charts.BatteryPower) {
        this.batteryPowerRef.handleCombineSplit(val, value)
        this.handleGoogleAnalytics('Combine/Split', 'Battery Power')
      }
      if (charts.BatteryVoltage) {

      }
      if (charts.Current) {
        this.currentsRef.handleCombineSplit(val, value)
        this.handleGoogleAnalytics('Combine/Split', 'USB/Panel/Battery Current')
      }
      if (charts.Irradiance) {

      }
      if (charts.Temperature) {

      }
      if (charts.Humidity) {

      }

    } else if (period === 'Yearly') {
      this.setState({ combined: val === 'combine' ? true : false, })
      if (charts.BatteryPower) {
        this.batteryPowerRef.handleCombineSplit(val)
        this.handleGoogleAnalytics('Combine/Split', 'Battery Power')
      }
      if (charts.BatteryVoltage) {

      }
      if (charts.Current) {
        this.currentsRef.handleCombineSplit(val)
        this.handleGoogleAnalytics('Combine/Split', 'USB/Panel/Battery Current')
      }
      if (charts.Irradiance) {

      }
      if (charts.Temperature) {

      }
      if (charts.Humidity) {

      }

    }






  }

  renderChooseFiltersDaily(classes) {

    return (
      <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>


        <h3>Date range (Limit 1 Month)</h3>
        <span>From:</span>
        <DatePicker
          customInput={<MyCustomInput className={classes.button} />}
          dateFormat="dd/MM/yyyy"
          withPortal
          selected={this.props.dates.start}
          minDate={this.props.dateLimits.start}
          maxDate={this.props.dateLimits.end}
          onChange={(date) => this.props.setDates({ start: date, end: this.props.dates.end })}
        />
        <span>To:</span><DatePicker
          customInput={<MyCustomInput className={classes.button} />}
          dateFormat="dd/MM/yyyy"
          withPortal
          selected={this.props.dates.end}
          onChange={(date) => this.props.setDates({ start: this.props.dates.start, end: date })}
          minDate={moment(this.props.dates.start).add(5, 'days').toDate()}
          maxDate={this.props.dates.endLimit}
        />

        <br />
        <Button variant="contained" color="primary" className={classes.button}
          onClick={this.handleApplyFilter} >
          Apply
      </Button>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={this.props.resetDates} >
          Reset
      </Button>
        {this.renderButtonsDaily()
        }
        {!this.state.combined ?
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart(true)} >
            Combine
        </Button>
          : <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart(false)} >
            Split
          </Button>
        }
      </div>
    )

  }

  renderChooseFiltersMonthly(classes) {

    return (
      <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>


        <h3>Select Year</h3>

        <FormControl style={{
          minWidth: 100,
        }}>

          <Select
            value={this.state.year}
            onChange={(e) => this.setState({ year: e.target.value })}
            input={<OutlinedInput name="age" id="outlined-age-simple" />}
          >
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" color="primary" className={classes.button}
          onClick={this.handleApplyFilter} >
          Apply
              </Button>
        {!this.state.combined ?
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart('combine')} >
            Combine
        </Button>
          : <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart('split')} >
            Split
          </Button>
        }
        <h3>Sort By:</h3>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts('month')}>
          Month
                  </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts('value')}>
          Value
                  </Button>

      </div>
    )

  }
  
  renderChooseFiltersYearly(classes) {

    return (
      <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>


        {!this.state.combined ?
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart('combine')} >
            Combine
        </Button>
          : <Button variant="contained" color="primary" className={classes.button}
            onClick={() => this.handleCombineChart('split')} >
            Split
          </Button>
        }
        <h3>Sort By:</h3>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts('year')}>
          Year
                  </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts('value')}>
          Value
                  </Button>

      </div>
    )

  }

  renderChooseCharts(classes) {
    return (
      <>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Choose Period:</FormLabel>
          <RadioGroup
            aria-label="Choose Period:"
            name="Period"
            className={classes.group}
            value={this.state.period}
            onChange={(event) => this.setState({ period: event.target.value })}
          >
            <FormControlLabel classes={{ label: classes.labelOptionStyle }} value="Daily" control={<Radio />} label="Daily" />

            <FormControlLabel classes={{ label: classes.labelOptionStyle }} value="Monthly" control={<Radio />} label="Monthly" />
            <FormControlLabel classes={{ label: classes.labelOptionStyle }} value="Yearly" control={<Radio />} label="Yearly" />

          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>

          <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Choose Chart:</FormLabel>
          <FormGroup>

            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={<Checkbox value="BatteryPower" checked={this.state.charts.BatteryPower} onChange={(e) => this.handleChooseChart(e)} />
              }
              label="Battery Power"
            />

            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={<Checkbox value="BatteryVoltage" checked={this.state.charts.BatteryVoltage} onChange={(e) => this.handleChooseChart(e)} />}
              label="Battery Voltage"
            />



            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={
                <Checkbox value="Irradiance" checked={this.state.charts.Irradiance} onChange={(e) => this.handleChooseChart(e)} />
              }
              label="Irradiance"
            />
            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={
                <Checkbox value="Temperature" checked={this.state.charts.Temperature} onChange={(e) => this.handleChooseChart(e)} />
              }
              label="Temperature"
            />
            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={
                <Checkbox value="Humidity" checked={this.state.charts.Humidity} onChange={(e) => this.handleChooseChart(e)} />
              }
              label="Humidity"
            />
            <FormControlLabel classes={{ label: classes.labelOptionStyle }}
              control={
                <Checkbox value="Current" checked={this.state.charts.Current} onChange={(e) => this.handleChooseChart(e)} />
              }
              label="Panel/USB Hub/Battery Current"
            />
          </FormGroup>
          <FormHelperText style={{ fontWeight: 'bold', color: 'black' }}>You can choose any number of charts</FormHelperText>
        </FormControl>


        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleShowCharts}
        >
          apply
  </Button>


      </>
    )
  }


  renderButtonsHide() {
    const classes = this.props.classes
    return (
      <>

        {!this.state.hide && <Button variant="contained" color="primary" className={classes.button} onClick={() => this.setState({ hide: true })}>
          Hide
              </Button>}

        {this.state.hide && <Button variant="contained" color="primary" className={classes.button} onClick={() => this.setState({ hide: false })}>
          Show Options
              </Button>}
      </>
    )
  }


  renderOptions(classes) {
    const { period } = this.props.options
    return (
      <Grid  item xs={12} md={12} lg={2} sm={12} xl={2} 
        style={{
          backgroundColor: this.state.hide ? 'rgba(255, 255,255, 0)' : 'rgba(255, 255,255, 1)',
          borderWidth: 2, borderColor: 'black'
        }}>
        {this.renderButtonsHide(classes)}
        {!this.state.hide && <Tabs>
          <TabList>

            <Tab><><span style={{ fontWeight: 'bold', fontSize: 16 }}>Charts</span></></Tab>
            {this.state.selectedGraphsCount !== 0 && <Tab><><span style={{ fontWeight: 'bold', fontSize: 16 }}>Filters </span></></Tab>}
          </TabList>

          <TabPanel>
            {this.renderChooseCharts(classes)}
          </TabPanel>
          {this.state.selectedGraphsCount !== 0 && <TabPanel>


            {(period === 'Daily') ? this.renderChooseFiltersDaily(classes) :
              (period === 'Monthly') ? this.renderChooseFiltersMonthly(classes) :
                (period === 'Yearly') ? this.renderChooseFiltersYearly(classes)
                  : <></>
            }




          </TabPanel>}
        </Tabs>}
      </Grid>
    )
  }



  handleShowCharts() {
    //this.setState({ hide: true })
    /*
          BatteryPower: false,
          BatteryVoltage: false,
          Current: false,
          Irradiance: false,
          Temperature: false,
          Humidity: false
    */

    let numOfCharts = 0
    const period=this.state.period
    let keys = Object.keys(this.state.charts)
    keys.forEach((k) => {

      if (this.state.charts[k] === true) {
        
        if (k === 'BatteryPower') {
          numOfCharts = numOfCharts + 2
          this.handleGoogleAnalytics('Chart Selected', period+' Battery Power')
        
        } else if (k === 'Current') {
          numOfCharts = numOfCharts + 3
          this.handleGoogleAnalytics('Chart Selected', period+' USB/Panel/Battery Current')
        
        } else if (k === 'BatteryVoltage') {
          numOfCharts = numOfCharts + 1
          this.handleGoogleAnalytics('Chart Selected', period+' Battery Voltage')
  
        } else if (k === 'Irradiance') {
          numOfCharts = numOfCharts + 1
          this.handleGoogleAnalytics('Chart Selected', period+' Irradiance')
        
        } else if (k === 'Temperature') {
          numOfCharts = numOfCharts + 1
          this.handleGoogleAnalytics('Chart Selected', period+' Temperature')
        
        } else if (k === 'Humidity') {
          numOfCharts = numOfCharts + 1
          this.handleGoogleAnalytics('Chart Selected', period+' Humidity')
        }
      }
    })


    let sizes = {}

    if (numOfCharts === 1) {
      sizes = {
        height: 450,
        xs: 12,
        md: 12,
        lg: 12,
        sm: 12,
        xl: 12,
      }
    }
    else if (numOfCharts === 2) {
      sizes = {
        height: 400,
        xs: 12,
        md: 6,
        lg: 6,
        sm: 12,
        xl: 6,
      }
    } else if (numOfCharts === 3) {
      sizes = {
        height: 400,
        xs: 12,
        md: 6,
        lg: 4,
        sm: 12,
        xl: 4,
      }
    }
    else if (numOfCharts === 4) {
      sizes = {
        height: 300,
        xs: 12,
        md: 6,
        lg: 6,
        sm: 12,
        xl: 6,
      }
    } else if (numOfCharts <= 6) {
      sizes = {
        height: 300,
        xs: 12,
        md: 6,
        lg: 4,
        sm: 12,
        xl: 4,
      }
    } else {
      sizes = {
        height: 250,
        xs: 12,
        md: 6,
        lg: 4,
        sm: 12,
        xl: 4,
      }
    }

    this.props.setSizes(sizes)

    this.props.setPeriod(_.cloneDeep(this.state.period))
    this.props.setCharts(_.cloneDeep(this.state.charts))
    this.setState({ selectedGraphsCount: numOfCharts, combined:false })
  }


  renderButtonsDaily() {
    const classes = this.props.classes
    return (
      <>

        {this.state.showing !== 1 && <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts(1)}>
          Per Hour
              </Button>}

        {this.state.showing !== 2 && <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleActionsOnCharts(2)}>
          Total/Average
              </Button>}
      </>
    )
  }


  LoadCharts() {

    const { period, charts } = this.props.options
    const { classes } = this.props;


    if ((charts.BatteryPower === false) && (charts.BatteryVoltage === false) && (charts.Current === false) && (charts.Irradiance === false) && (charts.Temperature === false) && (charts.Humidity === false)) {
      return (<></>)
    }


    if (period === 'Daily') {

      return (<Grid item xs={12} md={12} lg={this.state.hide ? 12 : 10} sm={12} xl={this.state.hide ? 12 : 10}
        container className={classes.grid} style={{ backgroundColor: 'rgba(255, 255,255, 1)', marginTop: 0 }} alignItems="center" justifyContent="center">
        {(charts.BatteryPower) && <DailyBatterPowerGrid onRef={ref => (this.batteryPowerRef = ref)} classes={classes} />}
        {(charts.BatteryVoltage) && <DailyBatteryVoltageGrid onRef={ref => (this.batteryVoltageRef = ref)} classes={classes} />}

        {(charts.Irradiance) && <DailyIrradianceGrid onRef={ref => (this.irradianceRef = ref)} classes={classes} />}
        {(charts.Temperature) && <DailyTemperatureGrid onRef={ref => (this.temperatureRef = ref)} classes={classes} />}
        {(charts.Humidity) && <DailyHumidityGrid onRef={ref => (this.humidityRef = ref)} classes={classes} />}
        {(charts.Current) && <DailyCurrentsGrid onRef={ref => (this.currentsRef = ref)} classes={classes} />}
      </Grid>)


    } else if (period === 'Monthly') {

      return (
        <Grid item xs={12} md={12} lg={this.state.hide ? 12 : 10} sm={12} xl={this.state.hide ? 12 : 10}
          container className={classes.grid} style={{ backgroundColor: 'rgba(255, 255,255, 1)', marginTop: 0 }} alignItems="center" justifyContent="center">
          {(charts.BatteryPower) && <MonthlyBatteryPowerGrid onRef={ref => (this.batteryPowerRef = ref)} classes={classes} />}
          {(charts.BatteryVoltage) && <MonthlyBatteryVoltageGrid onRef={ref => (this.batteryVoltageRef = ref)} classes={classes} />}

          {(charts.Irradiance) && <MonthlyIrradianceGrid onRef={ref => (this.irradianceRef = ref)} classes={classes} />}
          {(charts.Temperature) && <MonthlyTemperatureGrid onRef={ref => (this.temperatureRef = ref)} classes={classes} />}
          {(charts.Humidity) && <MonthlyHumidityGrid onRef={ref => (this.humidityRef = ref)} classes={classes} />}
          {(charts.Current) && <MonthlyCurrentsPowerGrid onRef={ref => (this.currentsRef = ref)} classes={classes} />}
        </Grid>
      )



    } else if (period === 'Yearly') {


      return (
        <Grid item xs={12} md={12} lg={this.state.hide ? 12 : 10} sm={12} xl={this.state.hide ? 12 : 10}
          container className={classes.grid} style={{ backgroundColor: 'rgba(255, 255,255, 1)', marginTop: 0 }} alignItems="center" justifyContent="center">
          {(charts.BatteryPower) && <YearlyBatteryPowerGrid onRef={ref => (this.batteryPowerRef = ref)} classes={classes} />}
          {(charts.BatteryVoltage) && <YearlyBatteryVoltageGrid onRef={ref => (this.batteryVoltageRef = ref)} classes={classes} />}

          {(charts.Irradiance) && <YearlyIrradianceGrid onRef={ref => (this.irradianceRef = ref)} classes={classes} />}
          {(charts.Temperature) && <YearlyTemperatureGrid onRef={ref => (this.temperatureRef = ref)} classes={classes} />}
          {(charts.Humidity) && <YearlyHumidityGrid onRef={ref => (this.humidityRef = ref)} classes={classes} />}
          {(charts.Current) && <YearlyCurrentsPowerGrid onRef={ref => (this.currentsRef = ref)} classes={classes} />}
        </Grid>

      )



    } else {
      return (<>

      </>)
    }

  }


  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline /><div style={{ minHeight: '100vh' }}>
          <Topbar currentPath={currentPath} />

          <div className={classes.root}>
            <Grid container justify="center" >
              <Grid spacing={6} container className={classes.grid}>

                {this.renderTopRow(classes)}

                {this.renderOptions(classes)}

                {this.LoadCharts()}

              </Grid>



              {
              }

            </Grid>
          </div>
        </div>
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  averageTemps: state.averageTemps,

  panelCurrentData: state.panelCurrentData,
  usbCurrentData: state.usbCurrentData,
  batteryCurrentData: state.batteryCurrentData,
  currentDates: state.currentDates,

  batteryVoltageData: state.batteryVoltageData,
  batteryVoltageDates: state.batteryVoltageDates,

  irradianceData: state.irradianceData,
  temperatureData: state.temperatureData,
  humidityData: state.humidityData,


  dates: state.dates,

  options: state.options

});

const mapDispatchToProps = dispatch => ({
  setSizes: item => dispatch(ACTIONS.setSizes(item)),

  setDates: items => dispatch(ACTIONS.setDates(items)),
  resetDates: items => dispatch(ACTIONS.resetDates(items)),

  setPeriod: items => dispatch(ACTIONS.setPeriod(items)),
  setCharts: items => dispatch(ACTIONS.setCharts(items)),

  loadTemps: items => dispatch(ACTIONS.loadTemps(items)),


  resetCurrentFilter: items => dispatch(ACTIONS.resetCurrentFilter(items)),
  filterCurrentDates: items => dispatch(ACTIONS.filterCurrentDates(items)),
  loadPanelCurrent: items => dispatch(ACTIONS.loadPanelCurrent(items)),
  loadUsbHubCurrent: items => dispatch(ACTIONS.loadUsbHubCurrent(items)),
  loadBatteryCurrent: items => dispatch(ACTIONS.loadBatteryCurrent(items)),


  loadBatteryVoltage: items => dispatch(ACTIONS.loadBatteryVoltage(items)),
  resetBatteryVoltageFilter: items => dispatch(ACTIONS.resetBatteryVoltageFilter(items)),
  filterBatteryVoltageDates: items => dispatch(ACTIONS.filterBatteryVoltageDates(items)),



  loadIrradiance: items => dispatch(ACTIONS.loadIrradiance(items)),
  loadTemperature: items => dispatch(ACTIONS.loadTemperature(items)),
  loadHumidity: items => dispatch(ACTIONS.loadHumidity(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Dashboard)));
