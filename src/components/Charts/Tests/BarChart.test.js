import React from 'react'
import { mount,shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import BarChart from '../BarChart'
const data = [
{"id":"January","value":12.49,"num":1},
{"id":"February","value":11.13,"num":2},
{"id":"March","value":12.55,"num":3},
{"id":"April","value":12.06,"num":4},
{"id":"May","value":12.36,"num":5},
{"id":"June","value":12.07,"num":6},
{"id":"July","value":12.35,"num":7},
{"id":"August","value":12.5,"num":8},
{"id":"September","value":12,"num":9},
{"id":"October","value":12.44,"num":10},
{"id":"November","value":11.93,"num":11},
{"id":"December","value":12.49,"num":12}]

it('should render bar chart correctly', () => {

    const component = renderer.create(
        <BarChart title={'Chart Title'}
        hideCSV={true}
        data={data}
        height={300}
        legendBottom={'BottomLegend'}
        legendLeft={'LeftLegend'}
        colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
        legend={false}
        labelTooltip={'tooltipLavel'} />

    )

let tree = component.toJSON()
expect(tree).toMatchSnapshot()
})



it('will check props', () => {
    const props = mount( <BarChart title={'Chart Title'}
    hideCSV={true}
    data={data}
    height={300}
    legendBottom={'BottomLegend'}
    legendLeft={'LeftLegend'}
    colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
    legend={false}
    labelTooltip={'tooltipLavel'} />).props();

    expect(props.height).toEqual(300);
    expect(props.data).toEqual(data);
    expect(props.legendBottom).toEqual('BottomLegend');
    expect(props.legendLeft).toEqual('LeftLegend');
    expect(props.colors).toEqual(['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']);
    expect(props.labelTooltip).toEqual('tooltipLavel');
    expect(props.legend).toEqual(false);
  });
  