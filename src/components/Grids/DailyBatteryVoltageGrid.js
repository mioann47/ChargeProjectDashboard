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




class DailyBatteryVoltageGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {

    };


    this.loadBatteryVoltagesDailyPerHour = this.loadBatteryVoltagesDailyPerHour.bind(this)
    //this.handleChangeChart = this.handleChangeChart.bind(this)
  }
  async componentDidMount() {
    this.props.onRef(this)

    await this.loadBatteryVoltagesDailyPerHour()

  }


  async handleLoadData(){
    

      await this.loadBatteryVoltagesDailyPerHour()
    
  }

  async loadBatteryVoltagesDailyPerHour() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadBatteryVoltagesDailyPerHour(dateStart, datefinish)

    if (result === null) {
      this.props.loadBatteryVoltage('ERROR')
      return;
    }

    this.props.loadBatteryVoltage(result)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  render() {
    const classes = this.props.classes
    return (
     

        <Grid item           
        xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl} 
         >
          {
            (this.props.batteryVoltageData) ?

              Charts.renderBatteryVoltageLineGraph([this.props.batteryVoltageData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>



     )
  }





}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  batteryVoltageData: state.batteryVoltageData,
  batteryVoltageDates: state.batteryVoltageDates,
  dates:state.dates,
  sizes:state.sizes
});

const mapDispatchToProps = dispatch => ({

  loadBatteryVoltage: items => dispatch(ACTIONS.loadBatteryVoltage(items)),
  resetBatteryVoltageFilter: items => dispatch(ACTIONS.resetBatteryVoltageFilter(items)),
  filterBatteryVoltageDates: items => dispatch(ACTIONS.filterBatteryVoltageDates(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((DailyBatteryVoltageGrid)));