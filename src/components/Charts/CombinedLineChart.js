import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import PropTypes from 'prop-types';
import { ShowAt, HideAt } from 'react-with-breakpoints';
import csvPng from '../../images/csv.png'
import { CSVLink } from "react-csv";
export default class CombinedLineChart extends Component {


    render() {
      const length=this.props.data.length
      return (
  <>        <div style={{textAlign:'center',justifyContent:'center'}}>
   <h3>{this.props.title} {!this.props.hideCSV&&<CSVLink
          filename={this.props.title.replace(/ /g,'').replace(/\//g,'')+".csv"}
            data={this.props.data[0].data.map((d,k)=>{
              let r={}
              r.Date=d.x
              for(let i=0;i<length;i++){
                r[this.props.data[i].id]=this.props.data[i].data[k].y
              }
              return r
            })
            }
          >
            <img width={15} height={15} src={csvPng} alt="Click to download chart data" />
          </CSVLink>}</h3>
          </div>

<div style={{ height: this.props.height }}>
<HideAt breakpoint="mediumAndAbove">
        <ResponsiveLine
          
          data={this.props.data}
          margin={{ top: 0, right: 5, bottom: 50, left: 60 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%dT%H:%MZ',
            precision: 'minute',
          }}
          curve="linear"
          xFormat="time:%d-%m-%Y %H:%M"
          yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
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
          legends={[]}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: '9px 12px',
                  border: '1px solid #ccc',
                }}
              >
                <div><strong>{slice.points[0].data.xFormatted}</strong></div>
                {slice.points.map(point => (
                  <div
                    key={point.id}
                    style={{
                      color: point.serieColor,
                      padding: '3px 0',
                    }}
                  >
                    <strong>{point.serieId}</strong>: {point.data.yFormatted} W
              </div>
                ))}
              </div>
            );
          }}
        />
      </HideAt>
      <HideAt breakpoint="small">
        <ResponsiveLine
          data={this.props.data}
          margin={{ top: 0, right: 150, bottom: 50, left: 60 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%dT%H:%MZ',
            precision: 'minute',
          }}
          curve="linear"
          xFormat="time:%d-%m-%Y %H:%M"
          yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
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
          legends={[
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
          ]}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: '9px 12px',
                  border: '1px solid #ccc',
                }}
              >
                <div><strong>{slice.points[0].data.xFormatted}</strong></div>
                {slice.points.map(point => (
                  <div
                    key={point.id}
                    style={{
                      color: point.serieColor,
                      padding: '3px 0',
                    }}
                  >
                    <strong>{point.serieId}</strong>: {point.data.yFormatted} {this.props.labelTooltip}
              </div>
                ))}
              </div>
            );
          }}
        />
      </HideAt>
    
        
        </div>
        </>
        
        
        )
    }
  }
  
  CombinedLineChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    ticks: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
    legendBottom: PropTypes.string.isRequired,
    legendLeft: PropTypes.string.isRequired,
    colors: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.func]).isRequired,
    area: PropTypes.bool.isRequired,
    labelTooltip:PropTypes.string,

  };