import React, { Component } from 'react';

import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import ACTIONS from "../../dataRedux/action";
import MyLoader from '../MyLoader'
import * as API from '../utils/API'
import * as Charts from '../Charts/MyCharts'



let showing=1;
class DailyTemperatureGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showing: showing,
      loading: false
    };


    this.loadTemperatureDailyPerHour = this.loadTemperatureDailyPerHour.bind(this)
    this.loadTemperatureDailyAverage = this.loadTemperatureDailyAverage.bind(this)
    this.handleChangeChart = this.handleChangeChart.bind(this)

    this.handleLoadData=this.handleLoadData.bind(this)
  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing===1)
    await this.loadTemperatureDailyPerHour()

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }

  async loadTemperatureDailyPerHour() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadTemperatureDailyPerHour(dateStart, datefinish)

    if (result === null) {
      this.props.loadTemperature('ERROR')
      return;
    }

    this.props.loadTemperature(result.temperature)
  }

  async loadTemperatureDailyAverage() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadTemperatureDailyAverage(dateStart, datefinish)

    if (result === null) {
      this.props.loadTemperature('ERROR')
      return;
    }

    this.props.loadTemperature(result.temperature)
  }




  renderDaily() {
    const classes = this.props.classes
    return (
     

        <Grid item xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl}  >
          {
            (this.props.temperatureData) ?

              Charts.renderTemperatureLineGraph([this.props.temperatureData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

      )

  }

  renderAvg() {
    const classes = this.props.classes
    return (
     

        <Grid item xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl}  >
          {
            (this.props.temperatureData) ?

              Charts.renderTemperatureLineAverageGraph([this.props.temperatureData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

)


  }


  async handleLoadData(){
    if (this.state.showing===1){

      await this.loadTemperatureDailyPerHour()
    }else if (this.state.showing===2){

      await this.loadTemperatureDailyAverage()
     } 
    
  }


  async handleChangeChart(num) {
    this.setState({ loading: true })
    if (num === 1) {
      await this.loadTemperatureDailyPerHour()
    } else if (num === 2) {
      await this.loadTemperatureDailyAverage()
    }
    this.setState({ showing: num, loading: false })
  }


  renderButtons() {
    const classes = this.props.classes
    return (
      <>
        {this.state.showing !== 1 &&
          <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleChangeChart(1)}>
            Show Hourly
              </Button>}
        {this.state.showing !== 2 &&
          <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleChangeChart(2)}>
            Show Daily Average
              </Button>}
      </>
    )
  }

  render() {

    if (this.state.loading) {
      return (
        <Grid item xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl}  >
          <div style={{ height: 350 }}>
            <MyLoader loading={true} />
          </div>
        </Grid>

      )

    }

    if (this.state.showing === 1) {
      return this.renderDaily()
    }
    else if (this.state.showing === 2) {
      return this.renderAvg()
    }


  }





}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  temperatureData: state.temperatureData,
  temperatureDates: state.temperatureDates,
  dates:state.dates,
  sizes:state.sizes
});


const mapDispatchToProps = dispatch => ({


  loadTemperature: items => dispatch(ACTIONS.loadTemperature(items)),
  resetTemperatureFilter: items => dispatch(ACTIONS.resetTemperatureFilter(items)),
  filterTemperatureDates: items => dispatch(ACTIONS.filterTemperatureDates(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((DailyTemperatureGrid)));