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
import MyCustomInput from '../MyCustomInput'


let showing=1;
class DailyBatteryPowerGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {

      combined: false,
      combined2: true,
      showing: showing,
      loading:false
    };


    this.loadBatteryPowersDailyPerHour = this.loadBatteryPowersDailyPerHour.bind(this)
    this.loadBatteryPowersDailyTotal = this.loadBatteryPowersDailyTotal.bind(this)
    this.handleChangeChart = this.handleChangeChart.bind(this)
    this.handleCombine=this.handleCombine.bind(this)
    this.handleLoadData=this.handleLoadData.bind(this)

  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing===1)
    await this.loadBatteryPowersDailyPerHour()

  }
  componentWillUnmount() {

    showing = this.state.showing;
    this.props.onRef(undefined)
  }

  async loadBatteryPowersDailyPerHour() {
    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadBatteryPowersDailyPerHour(dateStart, datefinish)

    if (result === null) {
      this.props.loadBatteryPowerIn('ERROR')
      this.props.loadBatteryPowerOut('ERROR')
    }

    this.props.loadBatteryPowerIn(result.BatteryPowerIn)
    this.props.loadBatteryPowerOut(result.BatteryPowerOut)

  }

  async loadBatteryPowersDailyTotal() {
    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadBatteryPowersDailyTotal(dateStart, datefinish)

    if (result === null) {
      this.props.loadBatteryPowerIn('ERROR')
      this.props.loadBatteryPowerOut('ERROR')
      return;
    }

    this.props.loadBatteryPowerIn(result.BatteryPowerIn)
    this.props.loadBatteryPowerOut(result.BatteryPowerOut)

  }

  async handleLoadData(){
    if (this.state.showing===1){

      await this.loadBatteryPowersDailyPerHour()
    }else if (this.state.showing===2){

      await this.loadBatteryPowersDailyTotal()
     } 
    
  }

  async handleChangeChart(num) {
    this.setState({ loading: true })
    if (num === 1) {
      await this.loadBatteryPowersDailyPerHour()
    } else if (num === 2) {
      await this.loadBatteryPowersDailyTotal()
    }
    this.setState({ showing: num,loading: false })
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
            Total
              </Button>}
      </>
    )
  }

  handleCombine(val){
    this.setState({ combined: val })
  }


  renderBatteryPowerDailyTotalGrid() {
    const classes = this.props.classes
    return (
      
        !this.state.combined ? <>
          <Grid item                     xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
                    md={(this.props.sizes.md>=12)?6:this.props.sizes.md} 
                    lg={(this.props.sizes.lg>=12)?6:this.props.sizes.lg} 
                    sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
                    xl={(this.props.sizes.xl>=12)?6:this.props.sizes.xl} >
            {this.props.batteryInData ?

              this.props.batteryInData === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryInLineDailyTotalGraph([this.props.batteryInData],this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid>
          <Grid item                     xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
                    md={(this.props.sizes.md>=12)?6:this.props.sizes.md} 
                    lg={(this.props.sizes.lg>=12)?6:this.props.sizes.lg} 
                    sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
                    xl={(this.props.sizes.xl>=12)?6:this.props.sizes.xl} >
            {this.props.batteryOutData ?

              this.props.batteryOutData === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryOutLineDailyTotalGraph([this.props.batteryOutData],this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid></>
          : <>
            <Grid item             xs={(this.props.sizes.xs*2>=12)?12:this.props.sizes.xs*2} 
            md={(this.props.sizes.md*2>=12)?12:this.props.sizes.md*2} 
            lg={(this.props.sizes.lg*2>=12)?12:this.props.sizes.lg*2} 
            sm={(this.props.sizes.sm*2>=12)?12:this.props.sizes.sm*2} 
            xl={(this.props.sizes.xl*2>=12)?12:this.props.sizes.xl*2} >

              {
                ((this.props.batteryOutData === 'ERROR') || (this.props.batteryInData === 'ERROR')) ?
                  <h3>Loading Failed</h3> :
                  Charts.renderCombinedBatteryPowerInOutDailyTotalGraph([this.props.batteryInData, this.props.batteryOutData],this.props.sizes.height)
              }
            </Grid>
          </>
        

       
    
    )
  }







  renderBatteryPowerDailyPerHourGrid() {
    const classes = this.props.classes
    return (
        !this.state.combined ? <>
          <Grid item 
          xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
          md={(this.props.sizes.md>=12)?6:this.props.sizes.md} 
          lg={(this.props.sizes.lg>=12)?6:this.props.sizes.lg} 
          sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
          xl={(this.props.sizes.xl>=12)?6:this.props.sizes.xl} 
          >
            {this.props.batteryInData ?

              this.props.batteryInData === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryInLineDailyPerHourGraph([this.props.batteryInData],this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid>
          <Grid item 
                    xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
                    md={(this.props.sizes.md>=12)?6:this.props.sizes.md} 
                    lg={(this.props.sizes.lg>=12)?6:this.props.sizes.lg} 
                    sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
                    xl={(this.props.sizes.xl>=12)?6:this.props.sizes.xl} 
          >
            {this.props.batteryOutData ?

              this.props.batteryOutData === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryOutLineDailyPerHourGraph([this.props.batteryOutData],this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid></>
          : <>
            <Grid item 
            
            xs={(this.props.sizes.xs*2>=12)?12:this.props.sizes.xs*2} 
            md={(this.props.sizes.md*2>=12)?12:this.props.sizes.md*2} 
            lg={(this.props.sizes.lg*2>=12)?12:this.props.sizes.lg*2} 
            sm={(this.props.sizes.sm*2>=12)?12:this.props.sizes.sm*2} 
            xl={(this.props.sizes.xl*2>=12)?12:this.props.sizes.xl*2} 
            >

              {
                ((this.props.batteryOutData === 'ERROR') || (this.props.batteryInData === 'ERROR')) ?
                  <h3>Loading Failed</h3> :
                  Charts.renderCombinedBatteryPowerInOutDailyPerHourGraph([this.props.batteryInData, this.props.batteryOutData],this.props.sizes.height)
              }
            </Grid>
          </>
        


      
    )
  }




  render() {


    if (this.state.loading){
      return (        
      <Grid item             
      xs={(this.props.sizes.xs*2>=12)?12:this.props.sizes.xs*2} 
      md={(this.props.sizes.md*2>=12)?12:this.props.sizes.md*2} 
      lg={(this.props.sizes.lg*2>=12)?12:this.props.sizes.lg*2} 
      sm={(this.props.sizes.sm*2>=12)?12:this.props.sizes.sm*2} 
      xl={(this.props.sizes.xl*2>=12)?12:this.props.sizes.xl*2} 
      
      
      >
        <div style={{ height: 350 }}>
          <MyLoader loading={true} />
        </div>
      </Grid>)
    }

    if (this.state.showing === 1) {
      return this.renderBatteryPowerDailyPerHourGrid()
    }
    else if (this.state.showing === 2) {
      return this.renderBatteryPowerDailyTotalGrid()
    }

  }





}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  batteryInData: state.batteryInData,
  batteryOutData: state.batteryOutData,
  batteryInOutDates: state.batteryInOutDates,
  dates:state.dates,
  sizes:state.sizes
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
)(withRouter((DailyBatteryPowerGrid)));