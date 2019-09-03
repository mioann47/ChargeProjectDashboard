
import React,  { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import * as time from 'd3-time';
import { timeFormat } from 'd3-time-format';
import range from 'lodash/range';
import last from 'lodash/last';

export default class RealTimeChart extends Component {
    constructor(props) {
      super(props);
  
      const date = new Date();
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
  
      this.state = {
        dataA: range(100).map(i => ({
          x: time.timeSecond.offset(date, i * 1),
          y: Math.round(Math.random() * 700/100*100)/100,
        })),
        dataB: range(100).map(i => ({
          x: time.timeSecond.offset(date, i * 1),
          y: Math.round(Math.random() * 200/100*100)/100,
        })),
        dataC: range(100).map(i => ({
          x: time.timeSecond.offset(date, i * 1),
          y: Math.round(Math.random() * 200/100*100)/100,
        })),
      };
  
      this.formatTime = timeFormat('%d %b %Y');
    }
  
    componentDidMount() {
      this.timer = setInterval(this.next, 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.timer);
    }
  
    next = () => {
      const dataA = this.state.dataA.slice(1);
      dataA.push({
        x: time.timeSecond.offset(last(dataA).x, 1),
        y:  Math.round(Math.random() * 700/100*100)/100,
      });
      const dataB = this.state.dataB.slice(1);
      dataB.push({
        x: time.timeSecond.offset(last(dataB).x, 1),
        y: Math.round(Math.random() * 200/100*100)/100,
      });
      const dataC = this.state.dataC.slice(1);
      dataC.push({
        x: time.timeSecond.offset(last(dataC).x, 1),
        y:  Math.round(Math.random() * 200/100*100)/100,
      });
  
      this.setState({ dataA, dataB, dataC });
    };
  
    render() {
      const { dataA, dataB, dataC } = this.state;
  
      return (
        <ResponsiveLine
        
          margin={{ top: 50, right: 150, bottom: 80, left: 60 }}
          data={[{ id: 'Battery Current', data: dataA }, { id: 'Panel Current', data: dataB }, { id: 'USB Hub Current', data: dataC }]}
          xScale={{ type: 'time', format: 'native' }}
          yScale={{ type: 'linear', max: "auto" }}

          axisBottom={{
            format: '%H:%M:%S',
            tickValues: 'every 10 second',
            legend: `${this.formatTime(dataA[0].x)} — ${this.formatTime(last(dataA).x)}`,
            legendPosition: 'middle',
            legendOffset: 70,
            tickRotation: -45
          }}
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
          axisLeft={{
            format: value => value,
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Current' + " (A)",
            legendOffset: -50,
            legendPosition: 'middle'
          }}
          colors={['#7570b3','#e6ab02','#666666']}
          enablePoints={false}
          enableGridX={true}
          curve="monotoneX"
          animate={false}
          motionStiffness={120}
          motionDamping={50}
          isInteractive={true}
          enableSlices={"x"}
          
          useMesh={true}
          theme={{
            axis: { ticks: { text: { fontSize: 14 } } },
            grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
          }}
        />
      );
    }
  }