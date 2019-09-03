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
class YearlyBatteryPowerGrid extends Component {

  constructor(props) {
    super(props)
    this.state = {

      combined: false,
      combined2: true,
      showing: showing,
      loading: false,
      combinedata: null,
      dataIn: null,
      dataOut: null,
      year: 2017
    };


    this.loadBatteryPowerYearlySum = this.loadBatteryPowerYearlySum.bind(this)
    this.loadCombinedBatteryPowerYearlySum = this.loadCombinedBatteryPowerYearlySum.bind(this)
    this.handleSort=this.handleSort.bind(this)
    this.handleLoadData = this.handleLoadData.bind(this)

  }
  async componentDidMount() {
    this.props.onRef(this)
    if (this.state.showing === 1)
      await this.loadBatteryPowerYearlySum()

  }
  componentWillUnmount() {
    showing = this.state.showing;
    this.props.onRef(undefined)
  }


  async loadBatteryPowerYearlySum() {

    let resultIn = await API.loadBatteryPowerInYearlySum()

    let resultOut = await API.loadBatteryPowerOutYearlySum()

    if (resultIn === null || resultOut === null) {
      this.setState({ dataIn: 'ERROR', dataOut: 'ERROR' })
      return
    }
    this.setState({ dataIn: resultIn, dataOut: resultOut })

  }

  async loadCombinedBatteryPowerYearlySum() {

    let result = await API.loadBatteryPowerInOutYearlySum()

    if (result === null) {
      this.setState({ combinedata: 'ERROR' })
      return
    }

    this.setState({ combinedata: result })

  }

  async handleLoadData() {
    if (!this.state.combined) {

      await this.loadBatteryPowerYearlySum()
    } else {

      await this.loadCombinedBatteryPowerYearlySum()
    }

  }



  async handleCombineSplit(type) {

    if (type === 'combine') {
      await this.loadCombinedBatteryPowerYearlySum()
      this.setState({ combined: true })
    } else if (type === 'split') {
      await this.loadBatteryPowerYearlySum()
      this.setState({ combined: false })
    }

  }


  async handleSort(type) {
    
    if (type === 'value') {
      if (!this.state.combined) {
        var byValueIn = [].concat(this.state.dataIn);
        byValueIn.sort((a, b) => b.value - a.value)
        this.setState({dataIn:byValueIn})
        var byValueOut = [].concat(this.state.dataOut);
        byValueOut.sort((a, b) => b.value - a.value)
        this.setState({dataOut:byValueOut})
      }
      else {
        var byValueC = [].concat(this.state.combinedata);
        byValueC.sort((a, b) => b["Battery Power In"] - a["Battery Power In"])
        this.setState({combinedata:byValueC})
      }

    }else if (type === 'year') {
      if (!this.state.combined) {
        var byMIn = [].concat(this.state.dataIn)
        byMIn.sort((a, b) => a.id - b.id)
        this.setState({dataIn:byMIn})
        var byMOut = [].concat(this.state.dataOut);
        byMOut.sort((a, b) => a.id - b.id)
        this.setState({dataOut:byMOut})

      }
      else {
        var byMC = [].concat(this.state.combinedata);
        byMC.sort((a, b) =>a.year - b.year)
        this.setState({combinedata:byMC})
      }
    }

  }


  renderBatteryPowerMonthlySumGrid() {
    const classes = this.props.classes
    return (
     !this.state.combined ? <>
                  <Grid item xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 6 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 6 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 6 : this.props.sizes.xl}  >
            {this.state.dataIn ?

              this.state.dataIn === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryPowerInYearlyBarGraph(this.state.dataIn,this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid>
          <Grid item xs={(this.props.sizes.xs >= 12) ? 12 : this.props.sizes.xs}
          md={(this.props.sizes.md >= 12) ? 6 : this.props.sizes.md}
          lg={(this.props.sizes.lg >= 12) ? 6 : this.props.sizes.lg}
          sm={(this.props.sizes.sm >= 12) ? 12 : this.props.sizes.sm}
          xl={(this.props.sizes.xl >= 12) ? 6 : this.props.sizes.xl}  >
            {this.state.dataOut ?

              this.state.dataOut === 'ERROR' ?
                <h3>Loading Failed</h3> :
                Charts.renderBatteryPowerOutYearlyBarGraph(this.state.dataOut,this.props.sizes.height) :
              <MyLoader loading={true} />}
          </Grid></>
          : <>
                      <Grid item xs={(this.props.sizes.xs * 2 >= 12) ? 12 : this.props.sizes.xs * 2}
            md={(this.props.sizes.md * 2 >= 12) ? 12 : this.props.sizes.md * 2}
            lg={(this.props.sizes.lg * 2 >= 12) ? 12 : this.props.sizes.lg * 2}
            sm={(this.props.sizes.sm * 2 >= 12) ? 12 : this.props.sizes.sm * 2}
            xl={(this.props.sizes.xl * 2 >= 12) ? 12 : this.props.sizes.xl * 2}  >

              {
                ((this.state.combinedata === 'ERROR')) ?
                  <h3>Loading Failed</h3> :
                  this.state.combinedata && Charts.renderCombinedBatteryPowerYearlyBarGraph(this.state.combinedata,this.props.sizes.height)
              }
            </Grid>
          </>
       

       
    )
  }




  render() {


    if (this.state.loading) {
      return (
        <Grid item xs={(this.props.sizes.xs * 2 >= 12) ? 12 : this.props.sizes.xs * 2}
        md={(this.props.sizes.md * 2 >= 12) ? 12 : this.props.sizes.md * 2}
        lg={(this.props.sizes.lg * 2 >= 12) ? 12 : this.props.sizes.lg * 2}
        sm={(this.props.sizes.sm * 2 >= 12) ? 12 : this.props.sizes.sm * 2}
        xl={(this.props.sizes.xl * 2 >= 12) ? 12 : this.props.sizes.xl * 2} >
        <div style={{ height: 350 }}>
          <MyLoader loading={true} />
        </div>
      </Grid>)}
    if (this.state.showing === 1) {
      return this.renderBatteryPowerMonthlySumGrid()
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
)(withRouter((YearlyBatteryPowerGrid)));