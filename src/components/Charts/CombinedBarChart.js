
import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import PropTypes from 'prop-types';
import { ShowAt, HideAt } from 'react-with-breakpoints';

import csvPng from '../../images/csv.png'
import { CSVLink } from "react-csv";
export default class CombinedBarChart extends Component {


  render() {
    return (<>

      <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <h3>{this.props.title} {!this.props.hideCSV&&<CSVLink
          filename={this.props.title.replace(/ /g,'').replace(/\//g,'')+".csv"}
            data={this.props.data}
          >
            <img width={15} height={15} src={csvPng} alt="Click to download chart data" />
          </CSVLink>}</h3></div>
      <div style={{ height: this.props.height }}>
        <HideAt breakpoint="small">
          <ResponsiveBar
          borderWidth={1}
            labelFormat={d => <tspan y={-8} x={30} font-weight="bold" font-size='13px'>{d}</tspan>}
            data={this.props.data}
            margin={{ top: 50, right: this.props.legend ? 150 : 5, bottom: 65, left: 60 }}
            padding={this.props.data.length>4?0.3:0.8}
            keys={this.props.keys}
            indexBy={this.props.indexBy}
            groupMode="grouped"
            colors={this.props.colors}
            colorBy="id"
            borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: this.props.legendBottom,
              legendPosition: 'middle',
              legendOffset: 55
            }}

            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: this.props.legendLeft,
              legendPosition: 'middle',
              legendOffset: -52
            }}
            labelSkipWidth={30}
            labelSkipHeight={30}
            labelTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
            legends={this.props.legend === true ? [
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ] : []}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </HideAt>
        <HideAt breakpoint="mediumAndAbove">
          <ResponsiveBar
          borderWidth={1}
            data={this.props.data}
            margin={{ top: 50, right: 5, bottom: 65, left: 60 }}
            padding={this.props.data.length>4?0.3:0.8}
            keys={this.props.keys}
            indexBy={this.props.indexBy}
            groupMode="grouped"
            colors={this.props.colors}
            colorBy="id"
            borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: this.props.legendBottom,
              legendPosition: 'middle',
              legendOffset: 55
            }}

            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: this.props.legendLeft,
              legendPosition: 'middle',
              legendOffset: -52
            }}
            labelSkipWidth={30}
            labelSkipHeight={30}
            labelTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
            labelFormat={d => <tspan y={-8}  x={30} font-weight="bold" font-size='13px'>{d}</tspan>}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </HideAt>
      </div></>)
  }


}

CombinedBarChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  legendBottom: PropTypes.string.isRequired,
  legendLeft: PropTypes.string.isRequired,
  colors: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.func]).isRequired,
  legend: PropTypes.bool.isRequired,
  keys: PropTypes.array.isRequired,
  indexBy: PropTypes.string.isRequired
};