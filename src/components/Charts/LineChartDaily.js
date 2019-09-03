
import React, { Component } from 'react';
import { ResponsiveLine, } from '@nivo/line'
import PropTypes from 'prop-types';
import csvPng from '../../images/csv.png'
import { CSVLink } from "react-csv";
export default class LineChartDaily extends Component {


  render() {
    return (
<>        <div style={{textAlign:'center',justifyContent:'center'}}>
<h3>{this.props.title} {!this.props.hideCSV&&<CSVLink
          filename={this.props.title.replace(/ /g,'').replace(/\//g,'')+".csv"}
          headers={[
            { label: "Date", key: "x" },
            { label: this.props.title, key: "y" }
          ]}
            data={this.props.data[0].data}
          >
            <img width={15} height={15} src={csvPng} alt="Click to download chart data" />
          </CSVLink>}</h3></div>
<div style={{ height: this.props.height }}>
      <ResponsiveLine
        data={this.props.data}
        margin={{ top: 30, right: this.props.legend ? 150 : 5, bottom: 60, left: 60 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'minute',
        }}
        curve="linear"

        xFormat="time:%d-%m-%Y"
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        enableArea={this.props.area}
        axisBottom={{
          orient: 'bottom',
          format: '%d/%m',
          tickValues: this.props.ticks,
          legend: this.props.legendBottom,
          legendOffset: 45,
          legendPosition: 'middle',
          tickRotation: -45

        }}
        axisLeft={{
          format: value => value,
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: this.props.legendLeft,
          legendOffset: -50,
          legendPosition: 'middle'
        }}
        colors={this.props.colors}
        enableCrosshair={false}
        enablePoints={false}
        enableGridX={false}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={this.props.legend === true ? [
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 85,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ] : []}
        tooltip={({ point }) => {
          return (

            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <span style={{ color: 'black' }}>
                {point.data.xFormatted}
              </span>
              <br />
              <span>{point.serieId}: </span><strong style={{ color: 'black' }}>
                {point.data.yFormatted} {this.props.labelTooltip}
              </strong>
            </div>
          );
        }}

      /></div></>)
  }
}

LineChartDaily.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  ticks: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
  legendBottom: PropTypes.string.isRequired,
  legendLeft: PropTypes.string.isRequired,
  colors: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.func]).isRequired,
  legend: PropTypes.bool.isRequired,
  area: PropTypes.bool.isRequired,
  labelTooltip:PropTypes.string,
};