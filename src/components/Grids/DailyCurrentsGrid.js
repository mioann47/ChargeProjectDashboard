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



let showing = 1;
class DailyCurrentsGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {

      combined: false,
      combined2: false,
      showing: showing,
      loading: false
    };


    this.loadCurrentsDailyPerHour = this.loadCurrentsDailyPerHour.bind(this)
    this.loadCurrentsDailyTotal = this.loadCurrentsDailyTotal.bind(this)

    this.handleChangeChart = this.handleChangeChart.bind(this)
    this.handleLoadData = this.handleLoadData.bind(this)

  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing === 1)
      await this.loadCurrentsDailyPerHour()

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }

  async loadCurrentsDailyTotal() {
    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadCurrentsDailyTotal(dateStart, datefinish)

    if (result === null) {

      this.props.loadPanelCurrent('ERROR')
      this.props.loadUsbHubCurrent('ERROR')
      this.props.loadBatteryCurrent('ERROR')
    }


    this.props.loadPanelCurrent(result.panel)
    this.props.loadUsbHubCurrent(result.usb)
    this.props.loadBatteryCurrent(result.battery)

  }


  async loadCurrentsDailyPerHour() {
    var dateStart = (moment(this.props.dates.start).hour(0)).toDate()
    var datefinish = (moment(this.props.dates.end).hour(23)).toDate()

    let result = await API.loadCurrentsDailyPerHour(dateStart, datefinish)

    if (result === null) {

      this.props.loadPanelCurrent('ERROR')
      this.props.loadUsbHubCurrent('ERROR')
      this.props.loadBatteryCurrent('ERROR')
    }


    this.props.loadPanelCurrent(result.panel)
    this.props.loadUsbHubCurrent(result.usb)
    this.props.loadBatteryCurrent(result.battery)

  }

  async handleLoadData() {
    if (this.state.showing === 1) {

      await this.loadCurrentsDailyPerHour()
    } else if (this.state.showing === 2) {

      await this.loadCurrentsDailyTotal()
    }

  }


  async handleChangeChart(num) {
    this.setState({ loading: true })
    if (num === 1) {
      await this.loadCurrentsDailyPerHour()
    } else if (num === 2) {
      await this.loadCurrentsDailyTotal()
    }
    this.setState({ showing: num, loading: false })
  }

  handleCombine(val) {
    this.setState({ combined2: val })
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
            Show Daily Total
              </Button>}
      </>
    )
  }






  renderDaily() {
    const classes = this.props.classes
    return (


      !this.state.combined2 ? <>

        <Grid item
          xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
        >
          {this.props.panelCurrentData ? Charts.renderPanelCurrentLineGraph([this.props.panelCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}

        </Grid>

        <Grid item
          xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
        >
          {this.props.usbCurrentData ? Charts.renderBatteryCurrentLineGraph([this.props.usbCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}
        </Grid>


        <Grid item
          xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
        >
          {this.props.batteryCurrentData ? Charts.renderUSBCurrentLineGraph([this.props.batteryCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}
        </Grid>

      </> :
        <Grid item
        xs={(this.props.sizes.xs * 3 >= 12) ? 12 : this.props.sizes.xs * 3}
        md={(this.props.sizes.md * 3 >= 12) ? 12 : this.props.sizes.md * 3}
        lg={(this.props.sizes.lg * 3 >= 12) ? 12 : this.props.sizes.lg * 3}
        sm={(this.props.sizes.sm * 3 >= 12) ? 12 : this.props.sizes.sm * 3}
        xl={(this.props.sizes.xl * 3 >= 12) ? 12 : this.props.sizes.xl * 3}
        >
          {
            (this.props.panelCurrentData &&
              this.props.usbCurrentData &&
              this.props.batteryCurrentData) ?

              Charts.renderCombinedCurrentLineGraph([this.props.usbCurrentData, this.props.batteryCurrentData, this.props.panelCurrentData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>
    )
  }

  renderTotal() {
    const classes = this.props.classes
    return (


      !this.state.combined2 ? <>

        <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl} >
          {this.props.panelCurrentData ? Charts.renderPanelCurrentDailyTotalGraph([this.props.panelCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}

        </Grid>

        <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}  >
          {this.props.usbCurrentData ? Charts.renderrBatteryCurrentDailyTotalGraph([this.props.usbCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}
        </Grid>

        <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl} >
          {this.props.batteryCurrentData ? Charts.renderUSBCurrentDailyTotalGraph([this.props.batteryCurrentData],this.props.sizes.height) : <MyLoader loading={true} />}
        </Grid>
      </>
        :
        <Grid item
        xs={(this.props.sizes.xs * 3 >= 12) ? 12 : this.props.sizes.xs * 3}
        md={(this.props.sizes.md * 3 >= 12) ? 12 : this.props.sizes.md * 3}
        lg={(this.props.sizes.lg * 3 >= 12) ? 12 : this.props.sizes.lg * 3}
        sm={(this.props.sizes.sm * 3 >= 12) ? 12 : this.props.sizes.sm * 3}
        xl={(this.props.sizes.xl * 3 >= 12) ? 12 : this.props.sizes.xl * 3}
        >
          {
            (this.props.panelCurrentData &&
              this.props.usbCurrentData &&
              this.props.batteryCurrentData) ?

              Charts.renderCombinedCurrentsDailyTotalGraph([this.props.usbCurrentData, this.props.batteryCurrentData, this.props.panelCurrentData],this.props.sizes.height) :
              <MyLoader loading={true} />}
        </Grid>

    )
  }


  render() {


    if (this.state.loading) {
      return (
        <Grid item
          xs={(this.props.sizes.xs * 2 >= 12) ? 12 : this.props.sizes.xs * 2}
          md={(this.props.sizes.md * 2 >= 12) ? 12 : this.props.sizes.md * 2}
          lg={(this.props.sizes.lg * 2 >= 12) ? 12 : this.props.sizes.lg * 2}
          sm={(this.props.sizes.sm * 2 >= 12) ? 12 : this.props.sizes.sm * 2}
          xl={(this.props.sizes.xl * 2 >= 12) ? 12 : this.props.sizes.xl * 2}
        >
          <div style={{ height: 350 }}>
            <MyLoader loading={true} />
          </div>
        </Grid>)
    }

    if (this.state.showing === 1) {
      return this.renderDaily()
    }
    else if (this.state.showing === 2) {
      return this.renderTotal()
    }

  }


}


const mapStateToProps = state => ({
  dateLimits: state.dateLimits,
  panelCurrentData: state.panelCurrentData,
  usbCurrentData: state.usbCurrentData,
  batteryCurrentData: state.batteryCurrentData,
  currentDates: state.currentDates,
  dates: state.dates,
  sizes: state.sizes
});

const mapDispatchToProps = dispatch => ({

  resetCurrentFilter: items => dispatch(ACTIONS.resetCurrentFilter(items)),
  filterCurrentDates: items => dispatch(ACTIONS.filterCurrentDates(items)),
  loadPanelCurrent: items => dispatch(ACTIONS.loadPanelCurrent(items)),
  loadUsbHubCurrent: items => dispatch(ACTIONS.loadUsbHubCurrent(items)),
  loadBatteryCurrent: items => dispatch(ACTIONS.loadBatteryCurrent(items)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter((DailyCurrentsGrid)));