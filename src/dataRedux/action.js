import Types from './types'

// action

const setDates = items => ({
  type:Types.SET_DATES,
  payload:items
})

const resetDates = items => ({
  type:Types.RESET_DATES,
  payload:items
})

const setPeriod = items => ({
  type:Types.SET_PERIOD,
  payload:items
})

const setCharts = items =>({
  type:Types.SET_CHARTS,
  payload:items
})


const loadBatteryVoltage = items => ({
  type: Types.LOAD_BATTERY_VOLTAGE,
  payload: items
})

const resetBatteryVoltageFilter = items => ({
  type: Types.RESET_FILTER_BATTERY_VOLTAGE,
  payload: items
})

const filterBatteryVoltageDates = items => ({
  type: Types.FILTER_BATTERY_VOLTAGE,
  payload: items
})


const loadIrradiance = items => ({
  type: Types.LOAD_IRRADIANCE,
  payload: items
})


const resetIrradianceFilter = items =>({
  type: Types.RESET_FILTER_IRRADIANCE,
  payload: items,
})

const filterIrradianceDates = items =>({
  type: Types.FILTER_IRRADIANCE,
  payload: items,
})



const loadTemperature = items => ({
  type: Types.LOAD_TEMPERATURE,
  payload: items
})

const filterTemperatureDates = items =>({
  type: Types.FILTER_TEMPERATURE,
  payload: items
})

const resetTemperatureFilter = items => ({
  type: Types.RESET_FILTER_TEMPERATURE,
  payload: items
})



const loadHumidity  = items => ({
  type: Types.LOAD_HUMIDITY,
  payload: items
})
const filterHumidityDates = items =>({
  type: Types.FILTER_HUMIDITY,
  payload: items
})

const resetHumidityFilter = items => ({
  type: Types.RESET_FILTER_HUMIDITY,
  payload: items
})



const resetCurrentFilter = items => ({
  type: Types.RESET_CURRENT_FILTER,
  payload: items
})

const filterCurrentDates = items => ({
  type: Types.FILTER_CURRENT_DATES,
  payload: items
})

const loadPanelCurrent = items => ({
  type: Types.LOAD_PANEL_CURRENT,
  payload: items
})
const loadUsbHubCurrent = items => ({
  type: Types.LOAD_USBHUB_CURRENT,
  payload: items
})
const loadBatteryCurrent = items => ({
  type: Types.LOAD_BATTERY_CURRENT,
  payload: items
})
///
const resetBatteryInOutFilter = items => ({
  type: Types.RESET_BATTERY_INTOUT_FILTER,
  payload: items
})

const filterBatteryInOutDates = items => ({
  type: Types.FILTER_BATTERY_INOUT_DATES,
  payload: items
})

const loadBatteryPowerIn = items => ({
  type: Types.LOAD_BATTERY_POWER_IN,
  payload: items
})
const loadBatteryPowerOut = items => ({
  type: Types.LOAD_BATTERY_POWER_OUT,
  payload: items
})

const loadTemps = items => ({
  type: Types.LOAD_TEMPS,
  payload: items
})

const sortTemps = sortBy => ({
  type: Types.SORT_TEMPS,
  payload: sortBy
})

const setSizes = item => ({
  type: Types.SET_SIZES,
  payload: item
})
export default {
  setSizes,
  
  setPeriod,
  setCharts,


  resetCurrentFilter,
  filterCurrentDates,
  loadPanelCurrent,
  loadUsbHubCurrent,
  loadBatteryCurrent,

  //
  loadTemps,
  sortTemps,
  loadBatteryPowerIn,
  loadBatteryPowerOut,
  filterBatteryInOutDates,
  resetBatteryInOutFilter,
  //


  loadBatteryVoltage,
  resetBatteryVoltageFilter,
  filterBatteryVoltageDates,

  loadIrradiance,
  resetIrradianceFilter,
  filterIrradianceDates,

  
  loadTemperature,
  filterTemperatureDates,
  resetTemperatureFilter,


  loadHumidity,
  filterHumidityDates,
  resetHumidityFilter,


setDates,
resetDates,

  Types,
};