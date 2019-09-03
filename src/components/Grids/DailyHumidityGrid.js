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
class DailyHumidityGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showing: showing,
      loading: false
    };


    this.loadHumidityDailyPerHour = this.loadHumidityDailyPerHour.bind(this)
    this.loadHumidityDailyAvg = this.loadHumidityDailyAvg.bind(this)
    this.handleChangeChart = this.handleChangeChart.bind(this)

  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing===1)
    await this.loadHumidityDailyPerHour()

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }

  async loadHumidityDailyPerHour() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadHumidityDailyPerHour(dateStart, datefinish)

    if (result === null) {
      this.props.loadHumidity('ERROR')
      return;
    }

    this.props.loadHumidity(result.humidity)
  }

  async loadHumidityDailyAvg() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadHumidityDailyAverage(dateStart, datefinish)

    if (result === null) {
      this.props.loadHumidity('ERROR')
      return;
    }

    this.props.loadHumidity(result.humidity)
  }


  renderDaily() {
    const classes = this.props.classes
    return (

        <Grid item         xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl} >
          {
            (this.props.humidityData) ?

              Charts.renderHumidityLineGraph([this.props.humidityData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

)
  }



  renderAvg() {
    const classes = this.props.classes
    return (
     

        <Grid item         xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl} >
          {
            (this.props.humidityData) ?

              Charts.renderHumidityLineAverageGraph([this.props.humidityData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

)

  }


  async handleLoadData(){
    if (this.state.showing===1){

      await this.loadHumidityDailyPerHour()
    }else if (this.state.showing===2){

      await this.loadHumidityDailyAvg()
     } 
    
  }




  async handleChangeChart(num) {
    this.setState({ loading: true })
    if (num === 1) {
      await this.loadHumidityDailyPerHour()
    } else if (num === 2) {
      await this.loadHumidityDailyAvg()
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
        <Grid item         xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl} >
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
  humidityData: state.humidityData,
  humidityDates: state.humidityDates,
  dates:state.dates,
  sizes:state.sizes
});


const mapDispatchToProps = dispatch => ({


  loadHumidity: items => dispatch(ACTIONS.loadHumidity(items)),
  resetHumidityFilter: items => dispatch(ACTIONS.resetHumidityFilter(items)),
  filterHumidityDates: items => dispatch(ACTIONS.filterHumidityDates(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((DailyHumidityGrid)));