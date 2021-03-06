import React, { Component } from 'react';

import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import _ from "lodash";
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import ACTIONS from "../../dataRedux/action";
import MyLoader from '../MyLoader'
import * as API from '../utils/APIMonthly'
import * as Charts from '../Charts/MyCharts'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


let showing = 1;
class MonthlyBatteryVoltageGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {


      showing: showing,
      loading: false,
      combinedata: null,
      data: null,
      year: 2017
    };


    this.loadBatteryVoltageMonthlyAverage = this.loadBatteryVoltageMonthlyAverage.bind(this)
    this.handleApply = this.handleApply.bind(this)
    this.handleSort=this.handleSort.bind(this)
    this.handleLoadData = this.handleLoadData.bind(this)


  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing === 1)
      await this.loadBatteryVoltageMonthlyAverage(2017)

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }


  async loadBatteryVoltageMonthlyAverage(year) {

    let result = await API.loadBatteryVoltageMonthlyAvg(year)
    console.log(result)
    if (result === null ) {
      this.setState({ data: 'ERROR'})
      return
    }
    this.setState({ data: result })

  }
  async handleLoadData(year) {
    await this.loadBatteryVoltageMonthlyAverage(year)
  }


  async handleApply() {

      await this.loadBatteryVoltageMonthlyAverage()
    
  }




  async handleSort(type) {
    
    if (type === 'value') {
     
        var byValue = [].concat(this.state.data);
        byValue.sort((a, b) => b.value - a.value)
        this.setState({data:byValue})
        
    

    }else if (type === 'month') {
     
        var byM = [].concat(this.state.data)
        byM.sort((a, b) => a.num - b.num)
        this.setState({data:byM})
    }

  }


  renderBatteryVoltageMonthlyAvgGrid() {
    const classes = this.props.classes
    return (
     
        
          <Grid item         xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
          md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
          lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
          sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
          xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl}  >
            {this.state.data ?

              this.state.data === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryVoltageMonthlyAvgBarGraph(this.state.data,this.props.sizes.height) :
              <MyLoader loading={true} />}
         
      </Grid>
    )
  }




  render() {


    if (this.state.loading) {
      return (
        <Grid item         xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl}  >
          <div style={{ height: 350 }}>
            <MyLoader loading={true} />
          </div>
        </Grid>)
    }

    if (this.state.showing === 1) {
      return this.renderBatteryVoltageMonthlyAvgGrid()
    }
    /*else if (this.state.showing === 2) {
      return this.renderBatteryPowerDailyTotalGrid()
    }*/

  }





}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  batteryInData: state.batteryInData,
  batteryOutData: state.batteryOutData,
  batteryInOutDates: state.batteryInOutDates,
  sizes: state.sizes
});

const mapDispatchToProps = dispatch => ({

  loadBatteryPowerIn: items => dispatch(ACTIONS.loadBatteryPowerIn(items)),
  loadBatteryPowerOut: items => dispatch(ACTIONS.loadBatteryPowerOut(items)),
  filterBatteryInOutDates: items => dispatch(ACTIONS.filterBatteryInOutDates(items)),
  resetBatteryInOutFilter: items => dispatch(ACTIONS.resetBatteryInOutFilter(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((MonthlyBatteryVoltageGrid)));