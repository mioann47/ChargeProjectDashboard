import React from 'react'
import { mount,shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import CombinedBarChart from '../CombinedBarChart'
const data = [
{"_id":{"index":1},"data1":20.68,"data2":12.49,"num":1,"index":"January"},
{"_id":{"index":2},"data1":18.67,"data2":11.13,"num":2,"index":"February"},
{"_id":{"index":3},"data1":20.73,"data2":12.55,"num":3,"index":"March"},
{"_id":{"index":4},"data1":20.04,"data2":12.06,"num":4,"index":"April"},
{"_id":{"index":5},"data1":20.67,"data2":12.36,"num":5,"index":"May"},
{"_id":{"index":6},"data1":20.01,"data2":12.07,"num":6,"index":"June"},
{"_id":{"index":7},"data1":20.65,"data2":12.35,"num":7,"index":"July"},
{"_id":{"index":8},"data1":20.67,"data2":12.5,"num":8,"index":"August"},
{"_id":{"index":9},"data1":20.02,"data2":12,"num":9,"index":"September"},
{"_id":{"index":10},"data1":20.69,"data2":12.44,"num":10,"index":"October"},
{"_id":{"index":11},"data1":19.97,"data2":11.93,"num":11,"index":"November"},
{"_id":{"index":12},"data1":20.67,"data2":12.49,"num":12,"index":"December"}]

it('should render bar chart correctly', () => {

    const component = renderer.create(
        <CombinedBarChart title={'Chart Title'}
        indexBy="index"
        keys={[ "data1","data2" ]}
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
    const props = mount( <CombinedBarChart title={'Chart Title'}
    keys={[ "data1","data2" ]}
    indexBy="index"
    hideCSV={true}
    data={data}
    height={300}
    legendBottom={'BottomLegend'}
    legendLeft={'LeftLegend'}
    colors={['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']}
    legend={false}
    labelTooltip={'tooltipLavel'} />).props();
    expect(props.indexBy).toEqual("index");
    expect(props.keys).toEqual([ "data1","data2" ]);
    expect(props.height).toEqual(300);
    expect(props.data).toEqual(data);
    expect(props.legendBottom).toEqual('BottomLegend');
    expect(props.legendLeft).toEqual('LeftLegend');
    expect(props.colors).toEqual(['#a6761d','#e7298a','#66a61e','#666666','#7570b3','#e6ab02','#d95f02','#1b9e77']);
    expect(props.labelTooltip).toEqual('tooltipLavel');
    expect(props.legend).toEqual(false);
  });
  