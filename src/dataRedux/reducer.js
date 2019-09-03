import ACTIONS from "./action";
import * as moment from 'moment';

const defaultState = {


  sizes: {
    height: 350,
    xs: 12,
    md: 6,
    lg: 4,
    sm: 12,
    xl: 4,
  },

  loadingBatteryPower: true,
  loadingBatteryVoltage: true,
  loadingCurrent: true,
  loadingIrradiance: true,
  loadingTemperature: true,
  loadingHumidity: true,

  options: {
    period: 'Daily',
    charts: {
      BatteryPower: false,
      BatteryVoltage: false,
      Current: false,
      Irradiance: false,
      Temperature: false,
      Humidity: false
    },
  },
  allData: null,
  dateLimits: {
    start: moment("2017-01-01").toDate(),
    end: moment("2018-12-31").toDate()
  },
  dates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },

  batteryInData: null,
  batteryOutData: null,
  batteryInOutDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },




  panelCurrentData: null,
  usbCurrentData: null,
  batteryCurrentData: null,
  currentDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },

  batteryVoltageData: null,
  batteryVoltageDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },





  irradianceData: null,
  irradianceDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },
  temperatureData: null,
  temperatureDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },
  humidityData: null,
  humidityDates: {
    start: moment("2017-01-20").toDate(),
    end: moment("2017-01-30").toDate(),
    endLimit: moment("2017-01-20").add(1, 'months').toDate(),
  },

  averageTemps: null,
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTIONS.Types.SET_SIZES:{
      let item= action.payload;
      return {...state, sizes:item}
    }



    case ACTIONS.Types.SET_DATES: {
      let items = action.payload;

      if (items.end <= items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, dates: items }
    }


    case ACTIONS.Types.RESET_DATES: {
      return { ...state, dates: defaultState.dates }
    }






    case ACTIONS.Types.SET_PERIOD: {
      let items = action.payload
      let options = {
        period: items,
        charts: state.options.charts
      }
      return { ...state, options: options }
    }
    case ACTIONS.Types.SET_CHARTS: {
      let items = action.payload
      let options = {
        period: state.options.period,
        charts: items
      }
      return { ...state, options: options }
    }





    case ACTIONS.Types.LOAD_BATTERY_VOLTAGE: {
      let items = action.payload;
      return { ...state, batteryVoltageData: items }
    }

    case ACTIONS.Types.FILTER_BATTERY_VOLTAGE: {
      let items = action.payload;

      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, batteryVoltageDates: items }
    }


    case ACTIONS.Types.RESET_FILTER_BATTERY_VOLTAGE: {
      return { ...state, batteryVoltageDates: defaultState.batteryVoltageDates }
    }




    case ACTIONS.Types.LOAD_IRRADIANCE: {
      let items = action.payload;
      return { ...state, irradianceData: items }
    }


    case ACTIONS.Types.FILTER_IRRADIANCE: {

      let items = action.payload;

      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, irradianceDates: items }

    }


    case ACTIONS.Types.RESET_FILTER_IRRADIANCE: {
      return { ...state, irradianceDates: defaultState.irradianceDates }
    }




    case ACTIONS.Types.LOAD_TEMPERATURE: {
      let items = action.payload;
      return { ...state, temperatureData: items }
    }
    case ACTIONS.Types.FILTER_TEMPERATURE: {

      let items = action.payload;

      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, temperatureDates: items }

    }


    case ACTIONS.Types.RESET_FILTER_TEMPERATURE: {
      return { ...state, temperatureDates: defaultState.temperatureDates }
    }


    case ACTIONS.Types.LOAD_HUMIDITY: {
      let items = action.payload;
      return { ...state, humidityData: items }
    }

    case ACTIONS.Types.FILTER_HUMIDITY: {

      let items = action.payload;

      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, humidityDates: items }
    }

    case ACTIONS.Types.RESET_FILTER_HUMIDITY: {
      return { ...state, humidityDates: defaultState.humidityDates }
    }





    case ACTIONS.Types.LOAD_BATTERY_CURRENT: {
      let items = action.payload;
      return { ...state, batteryCurrentData: items }
    }
    case ACTIONS.Types.LOAD_USBHUB_CURRENT: {
      let items = action.payload;
      return { ...state, usbCurrentData: items }
    }
    case ACTIONS.Types.LOAD_PANEL_CURRENT: {
      let items = action.payload;
      return { ...state, panelCurrentData: items }
    }

    case ACTIONS.Types.FILTER_CURRENT_DATES: {
      let items = action.payload;
      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, currentDates: items }
    }
    case ACTIONS.Types.RESET_CURRENT_FILTER: {
      return { ...state, currentDates: defaultState.currentDates }
    }



    case ACTIONS.Types.LOAD_BATTERY_POWER_IN: {
      let items = action.payload;
      return { ...state, batteryInData: items }
    }
    case ACTIONS.Types.LOAD_BATTERY_POWER_OUT: {
      let items = action.payload;
      return { ...state, batteryOutData: items }
    }

    case ACTIONS.Types.FILTER_BATTERY_INOUT_DATES: {
      let items = action.payload;
      if (items.end < items.start) {
        items.end = moment(items.start).add(5, 'days').toDate()
      }
      items.endLimit = moment(items.start).add(1, 'months').toDate()
      if (items.endLimit < items.end) {
        items.end = items.endLimit
      }
      return { ...state, batteryInOutDates: items }
    }
    case ACTIONS.Types.RESET_BATTERY_INTOUT_FILTER: {
      return { ...state, batteryInOutDates: defaultState.batteryInOutDates }
    }


    case ACTIONS.Types.LOAD_TEMPS: {
      let items = action.payload;
      return { ...state, averageTemps: items }
    }

    case ACTIONS.Types.SORT_TEMPS: {
      let sort = action.payload;
      let items = state.averageTemps;
      if (sort === 'value') {
        items.sort((a, b) => b.value - a.value)
      } else if (sort === 'month') {
        items.sort((a, b) => a.num - b.num)
      }
      return { ...state, averageTemps: items }
    }


    default:
      return state;
  }
};

export default todoReducer;