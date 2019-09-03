import React from 'react'
import { mount,shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import LineChartDaily from '../LineChartDaily'
const data = [{
    "id": "Test Chart",
    "data": [
        { "x": "2017-01-20T00:00Z", "y": 10 },
        { "x": "2017-01-20T01:00Z", "y": 12 },
        { "x": "2017-01-20T02:00Z", "y": 40 },
        { "x": "2017-01-20T03:00Z", "y": 63 },
        { "x": "2017-01-20T04:00Z", "y": 81 },
        { "x": "2017-01-20T05:00Z", "y": 86 },
        { "x": "2017-01-20T06:00Z", "y": 78 },
        { "x": "2017-01-20T07:00Z", "y": 68 },
        { "x": "2017-01-20T08:00Z", "y": 55 },
        { "x": "2017-01-20T09:00Z", "y": 34 },
        { "x": "2017-01-20T10:00Z", "y": 13 },
        { "x": "2017-01-20T11:00Z", "y": 10 },
        { "x": "2017-01-20T12:00Z", "y": 10 },
        { "x": "2017-01-20T13:00Z", "y": 10 },
        { "x": "2017-01-20T14:00Z", "y": 10 },
        { "x": "2017-01-20T15:00Z", "y": 10 },
        { "x": "2017-01-20T16:00Z", "y": 10 },
        { "x": "2017-01-20T17:00Z", "y": 10 },
        { "x": "2017-01-20T18:00Z", "y": 10 },
        { "x": "2017-01-20T19:00Z", "y": 10 },
        { "x": "2017-01-20T20:00Z", "y": 10 },
        { "x": "2017-01-20T21:00Z", "y": 10 },
        { "x": "2017-01-20T22:00Z", "y": 10 },
        { "x": "2017-01-20T23:00Z", "y": 10 },
        { "x": "2017-01-21T00:00Z", "y": 10 },
        { "x": "2017-01-21T01:00Z", "y": 11 },
        { "x": "2017-01-21T02:00Z", "y": 39 },
        { "x": "2017-01-21T03:00Z", "y": 64 },
        { "x": "2017-01-21T04:00Z", "y": 79 },
        { "x": "2017-01-21T05:00Z", "y": 86 },
        { "x": "2017-01-21T06:00Z", "y": 80 },
        { "x": "2017-01-21T07:00Z", "y": 69 },
        { "x": "2017-01-21T08:00Z", "y": 51 },
        { "x": "2017-01-21T09:00Z", "y": 33 },
        { "x": "2017-01-21T10:00Z", "y": 10 },
        { "x": "2017-01-21T11:00Z", "y": 10 },
        { "x": "2017-01-21T12:00Z", "y": 10 },
        { "x": "2017-01-21T13:00Z", "y": 10 }]
},{
    "id": "Test Chart 2",
    "data": [
        { "x": "2017-01-20T00:00Z", "y": 10 },
        { "x": "2017-01-20T01:00Z", "y": 12 },
        { "x": "2017-01-20T02:00Z", "y": 40 },
        { "x": "2017-01-20T03:00Z", "y": 63 },
        { "x": "2017-01-20T04:00Z", "y": 81 },
        { "x": "2017-01-20T05:00Z", "y": 86 },
        { "x": "2017-01-20T06:00Z", "y": 78 },
        { "x": "2017-01-20T07:00Z", "y": 68 },
        { "x": "2017-01-20T08:00Z", "y": 55 },
        { "x": "2017-01-20T09:00Z", "y": 34 },
        { "x": "2017-01-20T10:00Z", "y": 13 },
        { "x": "2017-01-20T11:00Z", "y": 10 },
        { "x": "2017-01-20T12:00Z", "y": 10 },
        { "x": "2017-01-20T13:00Z", "y": 10 },
        { "x": "2017-01-20T14:00Z", "y": 10 },
        { "x": "2017-01-20T15:00Z", "y": 10 },
        { "x": "2017-01-20T16:00Z", "y": 10 },
        { "x": "2017-01-20T17:00Z", "y": 10 },
        { "x": "2017-01-20T18:00Z", "y": 10 },
        { "x": "2017-01-20T19:00Z", "y": 10 },
        { "x": "2017-01-20T20:00Z", "y": 10 },
        { "x": "2017-01-20T21:00Z", "y": 10 },
        { "x": "2017-01-20T22:00Z", "y": 10 },
        { "x": "2017-01-20T23:00Z", "y": 10 },
        { "x": "2017-01-21T00:00Z", "y": 10 },
        { "x": "2017-01-21T01:00Z", "y": 11 },
        { "x": "2017-01-21T02:00Z", "y": 39 },
        { "x": "2017-01-21T03:00Z", "y": 64 },
        { "x": "2017-01-21T04:00Z", "y": 79 },
        { "x": "2017-01-21T05:00Z", "y": 86 },
        { "x": "2017-01-21T06:00Z", "y": 80 },
        { "x": "2017-01-21T07:00Z", "y": 69 },
        { "x": "2017-01-21T08:00Z", "y": 51 },
        { "x": "2017-01-21T09:00Z", "y": 33 },
        { "x": "2017-01-21T10:00Z", "y": 10 },
        { "x": "2017-01-21T11:00Z", "y": 10 },
        { "x": "2017-01-21T12:00Z", "y": 10 },
        { "x": "2017-01-21T13:00Z", "y": 10 }]
}]


it('should render line chart correctly', () => {

    const component = renderer.create(
    <LineChartDaily title={'Chart Title'}
    hideCSV={true}
        height={300}
        data={data}
        ticks={10}
        legendBottom={'BottomLegend'}
        legendLeft={'LeftLegend'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'tooltipLavel'}
        area={false} />
    )

let tree = component.toJSON()
expect(tree).toMatchSnapshot()
})



it('will check props', () => {
    const props = mount(<LineChartDaily title={'Chart Title'}
    hideCSV={true}
        height={300}
        data={data}
        ticks={10}
        legendBottom={'BottomLegend'}
        legendLeft={'LeftLegend'}
        colors={['#7570b3']}
        legend={false}
        labelTooltip={'tooltipLavel'}
        area={false} />).props();
    expect(props.height).toEqual(300);
    expect(props.data).toEqual(data);
    expect(props.ticks).toEqual(10);
    expect(props.legendBottom).toEqual('BottomLegend');
    expect(props.legendLeft).toEqual('LeftLegend');
    expect(props.colors).toEqual(['#7570b3']);
    expect(props.labelTooltip).toEqual('tooltipLavel');
    expect(props.area).toEqual(false);
  });
  