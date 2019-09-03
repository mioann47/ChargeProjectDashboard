import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Topbar from '../components/Topbar';
import { ResponsiveLine } from '@nivo/line'
import RealTimeChart from '../components/Charts/RealTimeChart'


const backgroundShape = require('../images/shape.svg');
const background = require('../images/backgroundCharge.jpg');
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundSize: 'cover',
    background: `url(${background})`,
    backgroundColor: 'black',
    height: '91vh'
  },
  grid: {
    width: '95%',
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});

class ExampleLive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      learnMoredialog: false,
      getStartedDialog: false,
      data: null
    };



  }



  componentDidMount() {



  }
  renderRespnonsiveLine() {
    return (<ResponsiveLine
      data={this.state.data}
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%MZ',
        precision: 'minute',
      }}
      curve="linear"
      xFormat="time:%d-%m-%Y %H:%M"
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      enableArea={true}
      axisBottom={{
        orient: 'bottom',
        format: '%d/%m',
        tickValues: "every 24 hours",
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        format: value => value + " W",
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Power',
        legendOffset: -50,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'category10' }}
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
              {point.data.yFormatted} W
          </strong>
          </div>
        );
      }}

    />)
  }


  renderComparedGraph(data) {
    return (<ResponsiveLine
      data={data}
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
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
      enableArea={true}
      axisBottom={{
        orient: 'bottom',
        format: '%d/%m',
        tickValues: "every 24 hours",
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        format: value => value,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Power' + " (W)",
        legendOffset: -50,
        legendPosition: 'middle'
      }}

      colors={{ scheme: 'category10' }}
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
                <strong>{point.serieId}</strong>: {point.data.yFormatted} W
              </div>
            ))}
          </div>
        );
      }}
    />)
  }
  renderBatteryInLineGraph(data) {
    return (<ResponsiveLine
      data={data}
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%MZ',
        precision: 'minute',
      }}
      curve="linear"

      xFormat="time:%d-%m-%Y %H:%M"
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      enableArea={true}
      axisBottom={{
        orient: 'bottom',
        format: '%d/%m',
        tickValues: "every 24 hours",
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        format: value => value,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Power' + " (W)",
        legendOffset: -50,
        legendPosition: 'middle'
      }}
      colors={['#ff7f0e']}
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
              {point.data.yFormatted} W
          </strong>
          </div>
        );
      }}

    />)
  }
  renderBatteryOutLineGraph(data) {
    return (<ResponsiveLine
      data={data}
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%MZ',
        precision: 'minute',
      }}
      curve="linear"

      xFormat="time:%d-%m-%Y %H:%M"
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      enableArea={true}
      axisBottom={{
        orient: 'bottom',
        format: '%d/%m',
        tickValues: "every 24 hours",
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        format: value => value,
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Power' + " (W)",
        legendOffset: -50,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'category10' }}
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
              {point.data.yFormatted} W
          </strong>
          </div>
        );
      }}

    />)
  }
  getData(name) {
    var dd = {};
    dd["id"] = name[0]["Series"];
    dd["data"] = []
    Object.keys(name[0]).forEach((e, i) => {
      if (e !== "Series") {
        var temp = {}
        temp.x = e
        temp.y = name[0][e]
        dd["data"].push(temp)
      }
    })
    return dd
  }







  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>

          {<Grid container justify="center">
            <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid} style={{backgroundColor: 'rgba(255, 255,255, 1)',marginTop:30}}>


              <Grid item xs={12} md={12} lg={12} sm={12} xl={12} style={{ height: 600 }}>

                <RealTimeChart />

              </Grid>


            </Grid>
          </Grid>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(ExampleLive));
