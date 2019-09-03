
import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import PropTypes from 'prop-types';
import csvPng from '../../images/csv.png'
import { CSVLink } from "react-csv";


export default class BarChart extends Component {


    render(){
     
        return (<>
        <div style={{textAlign:'center',justifyContent:'center'}}>
        <h3>{this.props.title} {!this.props.hideCSV&&<CSVLink
         filename={this.props.title.replace(/ /g,'').replace(/\//g,'')+".csv"}
          headers={[
            { label: this.props.legendBottom, key: "id" },
            { label: this.props.title, key: "value" },
          ]}
            data={this.props.data}
          >
            <img width={15} height={15} src={csvPng} alt="Click to download chart data" />
          </CSVLink>}</h3></div>
        <div style={{ height: this.props.height }}>
        <ResponsiveBar
                borderWidth={1}
                data={this.props.data}
                margin={{ top: 50, right: this.props.legend ? 150 : 5, bottom: 65, left: 60 }}
                padding={this.props.data.length>4?0.3:0.8}
                groupMode="grouped"
                colors={this.props.colors}
                colorBy="index"
                borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
                
                axisRight={null}
                axisTop={null}
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
                labelFormat= {d => <tspan y={ -8 } font-weight="bold" font-size='13px'>{ d }</tspan>}
                labelSkipWidth={this.props.labelSkipWidth||30}
                labelSkipHeight={30}
                labelTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
                tooltip={(d) => (
                    <strong>
                      {d.indexValue}: {d.value} {this.props.labelTooltip}
                    </strong>
                  )}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
        </div>
        
        </>)
    }


}

BarChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired,
    legendBottom: PropTypes.string.isRequired,
    legendLeft: PropTypes.string.isRequired,
    colors: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.func]).isRequired,
    legend: PropTypes.bool.isRequired,
    labelTooltip:PropTypes.string,
    labelSkipWidth:PropTypes.number
  };