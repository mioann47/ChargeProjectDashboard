
import React from 'react';

import LineChart from './LineChart'
import LineChartDaily from './LineChartDaily'

import CombinedLineChart from './CombinedLineChart'
import CombinedLineChartDaily from './CombinedLineChartDaily'


import AdvancedLineChart from './AdvancedLineChart'

import BarChart from './BarChart'
import CombinedBarChart from './CombinedBarChart'

export function renderBatteryInLineDailyPerHourGraph(data,height=350) {

  return (
   
      <LineChart title={'Battery Power In'}
         height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Power (W)'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'W'}
        area={false} />
   )
}


export function renderBatteryOutLineDailyPerHourGraph(data,height=350) {
  return (
      <LineChart title={'Battery Power Out'}
 height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Power (W)'}
        colors={['#e6ab02']}
        legend={false}
        labelTooltip={'W'}
        area={false} />
    )
}

export function renderCombinedBatteryPowerInOutDailyPerHourGraph(data,height=350) {
  return (
      <CombinedLineChart title={'Battery Power In/Out'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Power (W)'}
        labelTooltip={'W'}
        colors={['#7570b3','#e6ab02']}
        area={false} />
    
  )
}



export function renderBatteryInLineDailyTotalGraph(data,height=350) {

  return (
   
      <LineChartDaily title={'Daily Total Battery Power In - Energy (kWh)'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'kWh'}
        area={false} />
   )
}


export function renderBatteryOutLineDailyTotalGraph(data,height=350) {
  return (
    
      <LineChartDaily title={'Daily Total Battery Power Out - Energy (kWh)'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Energy (kWh)'}
        colors={['#e6ab02']}
        legend={false}
        labelTooltip={'kWh'}
        area={false} />
   )
}

export function renderCombinedBatteryPowerInOutDailyTotalGraph(data,height=350) {
  return (
   
      <CombinedLineChartDaily title={'Daily Total Battery Power In/Out - Energy (kWh)'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3','#e6ab02']}
        labelTooltip={'kWh'}
        area={false} />
   
  )
}






export function renderBatteryVoltageLineGraph(data,height=350) {

  return (
    
      <AdvancedLineChart title={'Battery Voltage'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Volts (V)'}
        colors={['#7570b3']}
        legend={false}
        area={false} />
   )
}

export function renderCombinedCurrentLineGraph(data,height=350) {
  return (
      <CombinedLineChart title={'Panel/USB Hub/Battery Current'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#666666','#7570b3','#e6ab02']}
        labelTooltip={'A'}
        area={false} />
  )
}

export function renderUSBCurrentLineGraph(data,height=350) {
  return (
      <LineChart title={'USB Hub Current'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#666666']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
  )
}

export function renderPanelCurrentLineGraph(data,height=350) {
  return (
      <LineChart title={'Panel Current'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#e6ab02']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}

export function renderBatteryCurrentLineGraph(data,height=350) {
  return (
    
      <LineChart title={'Battery Current'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    
  )
}


export function renderUSBCurrentDailyTotalGraph(data,height=350) {
  return (
    
      <LineChartDaily title={'Daily Total USB Hub Current'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#666666']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}
export function renderPanelCurrentDailyTotalGraph(data,height=350) {
  return (
      <LineChartDaily title={'Daily Total Panel Current'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#e6ab02']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
  )
}
export function renderrBatteryCurrentDailyTotalGraph(data,height=350) {
  return (
      <LineChartDaily title={'Daily Total Battery Current'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
   )
}

export function renderCombinedCurrentsDailyTotalGraph(data,height=350) {
  return (
      <CombinedLineChartDaily title={'Daily Total USB Hub/Panel/Battery Current'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Current (A)'}
        colors={['#666666','#7570b3','#e6ab02']}
        labelTooltip={'A'}
        area={false} />
    
  )
}







export function renderIrradianceLineGraph(data,height=350) {

  return (
      <AdvancedLineChart title={'Irradiance'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Irradiance (W/m²)'}
        colors={['#ff7f0e']}
        legend={false}
        labelTooltip={'(W/m²)'}
        area={false} />
    )
}

export function renderIrradianceLineAverageGraph(data,height=350) {

  return (
      <LineChartDaily title={'Daily Average Irradiance'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Irradiance (W/m²)'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'(W/m²)'}
        area={false} />
   )
}

export function renderTemperatureLineGraph(data,height=350) {

  return (
      <AdvancedLineChart title={'Temperature'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Temperature (°C)'}
        colors={['#e6ab02']}
        labelTooltip={'(°C)'}
        legend={false}
        area={false} />
    )
}
export function renderTemperatureLineAverageGraph(data,height=350) {

  return (
      <LineChartDaily title={'Daily Average Temperature'}
       height={height}
        data={data}
        ticks={10}
        legendBottom={'Date'}
        legendLeft={'Temperature (°C)'}
        colors={['#e6ab02']}
        legend={false}
        labelTooltip={'(°C)'}
        area={false} />
    )
}

export function renderHumidityLineGraph(data,height=350) {
  return (
      <AdvancedLineChart title={'Humidity'}
       height={height}
        data={data}
        ticks={5}
        legendBottom={'Date'}
        legendLeft={'Humidity (H%)'}
        colors={['#666666']}
        legend={false}
        area={false} />
    )
}
export function renderHumidityLineAverageGraph(data,height=350) {

  return (
      <LineChartDaily title={'Daily Average Humidity'}
        data={data}
        ticks={10}
         height={height}
        legendBottom={'Date'}
        legendLeft={'Humidity (H%)'}
        colors={['#666666']}
        legend={false}
        labelTooltip={'(H%)'}
        area={false} />
    )
}

/***
 * MONTHLY
 */

export function renderBatteryPowerInMonthlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Battery Power In - Energy (kWh)'}
       height={height}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Energy (kWh)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'kWh'}
        area={false} />
    )
}

export function renderBatteryPowerOutMonthlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Battery Power Out - Energy (kWh)'}
        data={data}
         height={height}
        legendBottom={'Month'}
        legendLeft={'Energy (kWh)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'kWh'} />
   )
}

export function renderCombinedBatteryPowerMonthlyBarGraph(data,height=350) {

  return (
      <CombinedBarChart 
       height={height}
        title={'Monthly Battery Power In/Out - Energy (kWh)'}
        data={data}
        keys={[ "Battery Power In","Battery Power Out" ]}
        indexBy="month"
        legendBottom={'Month'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3','#e6ab02']}
        legend={true}/>
   )
}

export function renderPanelCurrentMonthlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Panel Current'}
       height={height}
      labelSkipWidth={50}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Current (A)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}

export function renderUSBCurrentMonthlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly USB Hub Current'}
       height={height}
      labelSkipWidth={50}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Current (A)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}
export function renderBatteryCurrentMonthlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Battery Current'}
       height={height}
        labelSkipWidth={50}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Current (A)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}

export function renderCombinedCurrentsMonthlyBarGraph(data,height=350) {

  return (
      <CombinedBarChart 
       height={height}
      labelSkipWidth={50}
        title={'Monthly Panel/USB Hub/Battery Current'}
        data={data}
        keys={[ "Battery Current","USB Hub Current","Panel Current" ]}
        indexBy="month"
        legendBottom={'Month'}
        legendLeft={'Current (A)'}
        colors={['#7570b3','#e6ab02','#666666']}
        legend={true}/>
    )
}


export function renderBatteryVoltageMonthlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Average Battery Voltage'}
        data={data}
         height={height}
        legendBottom={'Month'}
        legendLeft={'Volts (V)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'V'}
        area={false} />
    )
}
export function renderTemperatureMonthlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Average Temperature'}
        data={data}
         height={height}
        legendBottom={'Month'}
        legendLeft={'Temperature (°C)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'°C'}
        area={false} />
    )
}

export function renderHumidityMonthlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Average Humidity'}
       height={height}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Humidity (H%)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'H%'}
        area={false} />
    )
}

export function renderIrradianceMonthlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Monthly Average Irradiance'}
       height={height}
        labelSkipWidth={50}
        data={data}
        legendBottom={'Month'}
        legendLeft={'Irradiance (W/m²)'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'W/m²'}
        area={false} />
    )
}



/***
 * YEARLY
 */

export function renderBatteryPowerInYearlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Battery Power In - Energy (kWh)'}
       height={height}
        data={data}
        legendBottom={'Year'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'kWh'}
        area={false} />
    )
}

export function renderBatteryPowerOutYearlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Battery Power Out - Energy (kWh)'}
        data={data}
         height={height}
        legendBottom={'Year'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'kWh'} />
   )
}

export function renderCombinedBatteryPowerYearlyBarGraph(data,height=350) {

  return (
      <CombinedBarChart 
       height={height}
        title={'Yearly Battery Power In/Out - Energy (kWh)'}
        data={data}
        keys={[ "Battery Power In","Battery Power Out" ]}
        indexBy="year"
        legendBottom={'Year'}
        legendLeft={'Energy (kWh)'}
        colors={['#7570b3','#e6ab02']}
        legend={true}/>
   )
}
export function renderBatteryVoltageYearAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Average Battery Voltage'}
        data={data}
         height={height}
        legendBottom={'Year'}
        legendLeft={'Volts (V)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'V'}
        area={false} />
    )
}




export function renderPanelCurrentYearlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Panel Current'}
       height={height}
        data={data}
        legendBottom={'Year'}
        legendLeft={'Current (A)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}

export function renderUSBCurrentYearlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly USB Hub Current'}
       height={height}
        data={data}
        legendBottom={'Year'}
        legendLeft={'Current (A)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}
export function renderBatteryCurrentYearlyBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Battery Current'}
       height={height}
        data={data}
        legendBottom={'Year'}
        legendLeft={'Current (A)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'A'}
        area={false} />
    )
}

export function renderCombinedCurrentsYearlyBarGraph(data,height=350) {

  return (
      <CombinedBarChart 
       height={height}
        title={'Yearly Panel/USB Hub/Battery Current'}
        data={data}
        keys={[ "Battery Current","USB Hub Current","Panel Current" ]}
        indexBy="year"
        legendBottom={'Year'}
        legendLeft={'Current (A)'}
        colors={['#7570b3','#e6ab02','#666666']}
        legend={true}/>
    )
}

export function renderTemperatureYearlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Average Temperature'}
        data={data}
         height={height}
        legendBottom={'Year'}
        legendLeft={'Temperature (°C)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'°C'}
        area={false} />
    )
}

export function renderHumidityYearlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Average Humidity'}
       height={height}
        data={data}
        legendBottom={'Year'}
        legendLeft={'Humidity (H%)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'H%'}
        area={false} />
    )
}

export function renderIrradianceYearlyAvgBarGraph(data,height=350) {

  return (
      <BarChart title={'Yearly Average Irradiance'}
       height={height}
        
        data={data}
        legendBottom={'Year'}
        legendLeft={'Irradiance (W/m²)'}
        colors={['#7570b3','#e6ab02']}
        legend={false}
        labelTooltip={'W/m²'}
        area={false} />
    )
}