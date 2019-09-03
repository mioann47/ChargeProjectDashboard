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
class DailyIrradianceGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showing: showing,
      loading: false
    };


    this.loadIrradiancesDailyPerHour = this.loadIrradiancesDailyPerHour.bind(this)
    this.loadIrradiancesDailyAverage = this.loadIrradiancesDailyAverage.bind(this)

    this.handleLoadData=this.handleLoadData.bind(this)
  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing===1)
    await this.loadIrradiancesDailyPerHour()

  }
    componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }

  async loadIrradiancesDailyPerHour() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadIrradiancesDailyPerHour(dateStart, datefinish)

    if (result === null) {
      this.props.loadIrradiance('ERROR')
      return;
    }

    this.props.loadIrradiance(result.irradiance)
  }

  async loadIrradiancesDailyAverage() {

    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadIrradiancesDailyAverage(dateStart, datefinish)

    if (result === null) {
      this.props.loadIrradiance('ERROR')
      return;
    }

    this.props.loadIrradiance(result.irradiance)
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
            (this.props.irradianceData) ?

              Charts.renderIrradianceLineGraph([this.props.irradianceData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>


)
  }

  renderAverage() {
    const classes = this.props.classes
    return (
      
        <Grid item xs={(this.props.sizes.xs>=12)?12:this.props.sizes.xs} 
        md={(this.props.sizes.md>=12)?12:this.props.sizes.md} 
        lg={(this.props.sizes.lg>=12)?12:this.props.sizes.lg} 
        sm={(this.props.sizes.sm>=12)?12:this.props.sizes.sm} 
        xl={(this.props.sizes.xl>=12)?12:this.props.sizes.xl} >
          {
            (this.props.irradianceData) ?

              Charts.renderIrradianceLineAverageGraph([this.props.irradianceData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

)
  }


  async handleLoadData(){

      await this.loadIrradiancesDailyPerHour()
  
    
  }



  async handleChangeChart(num) {
    this.setState({ loading: true })
    if (num === 1) {
      await this.loadIrradiancesDailyPerHour()
    } else if (num === 2) {
      await this.loadIrradiancesDailyAverage()
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
    /*else if (this.state.showing === 2) {
      return this.renderAverage()
    }*/


  }


}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  irradianceData: state.irradianceData,
  irradianceDates: state.irradianceDates,
  dates:state.dates,
  sizes:state.sizes
});

const mapDispatchToProps = dispatch => ({

  loadIrradiance: items => dispatch(ACTIONS.loadIrradiance(items)),

  resetIrradianceFilter: items => dispatch(ACTIONS.resetIrradianceFilter(items)),
  filterIrradianceDates: items => dispatch(ACTIONS.filterIrradianceDates(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((DailyIrradianceGrid)));