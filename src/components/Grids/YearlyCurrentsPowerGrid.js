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
import * as API from '../utils/APIYearly'
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
class YearlyCurrentsPowerGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {

      combined: false,
      combined2: true,
      showing: showing,
      loading: false,
      combinedata: null,
      dataPanel: null,
      dataUSB: null,
      dataBattery: null,
      year: 2017
    };


    this.loadCurrentsYearlySum = this.loadCurrentsYearlySum.bind(this)
    this.loadCombinedCurrentsYearlySum = this.loadCombinedCurrentsYearlySum.bind(this)

    this.handleSort = this.handleSort.bind(this)
    this.handleLoadData = this.handleLoadData.bind(this)

  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing === 1)
      await this.loadCurrentsYearlySum()

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }


  async loadCurrentsYearlySum() {

    let resultp = await API.loadPanelCurrentYearlySum()
    let resultu = await API.loadUSBCurrentYearlySum()
    let resultb = await API.loadBatteryCurrentYearlySum()
    if (resultp === null || resultu === null || resultb === null) {
      this.setState({ dataPanel: 'ERROR', dataUSB: 'ERROR', dataBattery: 'ERROR' })
      return
    }
    this.setState({ dataPanel: resultp, dataUSB: resultu, dataBattery: resultb })

  }

  async loadCombinedCurrentsYearlySum() {

    let result = await API.loadCurrentsYearlySum()
    if (result === null) {
      this.setState({ combinedata: 'ERROR' })
      return
    }

    this.setState({ combinedata: result })

  }

  async handleLoadData() {
    if (this.state.combined) {

      await this.loadCombinedCurrentsYearlySum()
    } else {

      await this.loadCurrentsYearlySum()
    }

  }



  async handleCombineSplit(type) {

    if (type === 'combine') {
      await this.loadCombinedCurrentsYearlySum()
      this.setState({ combined: true })
    } else if (type === 'split') {
      await this.loadCurrentsYearlySum()
      this.setState({ combined: false })
    }

  }


  async handleSort(type) {

    if (type === 'value') {
      if (!this.state.combined) {
        var byValueP = [].concat(this.state.dataPanel);
        byValueP.sort((a, b) => b.value - a.value)
        this.setState({ dataPanel: byValueP })

        var byValueU = [].concat(this.state.dataUSB);
        byValueU.sort((a, b) => b.value - a.value)
        this.setState({ dataUSB: byValueU })

        var byValueB = [].concat(this.state.dataBattery);
        byValueB.sort((a, b) => b.value - a.value)
        this.setState({ dataBattery: byValueB })
      }
      else {
        var byValueC = [].concat(this.state.combinedata);
        byValueC.sort((a, b) => b["Battery Current"] - a["Battery Current"])
        this.setState({ combinedata: byValueC })
      }

    } else if (type === 'year') {
      if (!this.state.combined) {
        var byMp = [].concat(this.state.dataPanel)
        byMp.sort((a, b) => a.num - b.num)
        this.setState({ dataPanel: byMp })
        var byMu = [].concat(this.state.dataUSB);
        byMu.sort((a, b) => a.num - b.num)
        this.setState({ dataUSB: byMu })
        var byMb = [].concat(this.state.dataBattery);
        byMb.sort((a, b) => a.num - b.num)
        this.setState({ dataBattery: byMb })
      }
      else {
        var byMC = [].concat(this.state.combinedata);
        byMC.sort((a, b) => a.year - b.year)
        this.setState({ combinedata: byMC })
      }
    }

  }


  renderCurrentsYearlySumGrid() {
    const classes = this.props.classes
    return (
      !this.state.combined ? <>
          <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
           >
          {this.state.dataPanel ?

            this.state.dataPanel === 'ERROR' ?
              <h3>Loading Failed</h3> :
              Charts.renderPanelCurrentYearlyBarGraph(this.state.dataPanel,this.props.sizes.height) :
            <MyLoader loading={true} />}
        </Grid>
        <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
           >
          {this.state.dataUSB ?

            this.state.dataUSB === 'ERROR' ?
              <h3>Loading Failed</h3> :
              Charts.renderUSBCurrentYearlyBarGraph(this.state.dataUSB,this.props.sizes.height) :
            <MyLoader loading={true} />}
        </Grid>
        <Grid item           xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 4 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 4 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 4 : this.props.sizes.xl}
           >
          {this.state.dataBattery ?

            this.state.dataBattery === 'ERROR' ?
              <h3>Loading Failed</h3> :
              Charts.renderBatteryCurrentYearlyBarGraph(this.state.dataBattery,this.props.sizes.height) :
            <MyLoader loading={true} />}
        </Grid>
        </>
        : <>
           <Grid item 
                    xs={(this.props.sizes.xs * 3 >= 12) ? 12 : this.props.sizes.xs * 3}
                    md={(this.props.sizes.md * 3 >= 12) ? 12 : this.props.sizes.md * 3}
                    lg={(this.props.sizes.lg * 3 >= 12) ? 12 : this.props.sizes.lg * 3}
                    sm={(this.props.sizes.sm * 3 >= 12) ? 12 : this.props.sizes.sm * 3}
                    xl={(this.props.sizes.xl * 3 >= 12) ? 12 : this.props.sizes.xl * 3} >

            {
              ((this.state.combinedata === 'ERROR')) ?
                <h3>Loading Failed</h3> :
                this.state.combinedata && Charts.renderCombinedCurrentsYearlyBarGraph(this.state.combinedata,this.props.sizes.height)
            }
          </Grid>

        </>

    )
  }




  render() {


    if (this.state.loading) {
      return (
        <Grid item xs={(this.props.sizes.xs * 3 >= 12) ? 12 : this.props.sizes.xs * 3}
          md={(this.props.sizes.md * 3 >= 12) ? 12 : this.props.sizes.md * 3}
          lg={(this.props.sizes.lg * 3 >= 12) ? 12 : this.props.sizes.lg * 3}
          sm={(this.props.sizes.sm * 3 >= 12) ? 12 : this.props.sizes.sm * 3}
          xl={(this.props.sizes.xl * 3 >= 12) ? 12 : this.props.sizes.xl * 3} >
          <div style={{ height: 350 }}>
            <MyLoader loading={true} />
          </div>
        </Grid>)
    }

    if (this.state.showing === 1) {
      return this.renderCurrentsYearlySumGrid()
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
)(withRouter((YearlyCurrentsPowerGrid)));