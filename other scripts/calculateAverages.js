'use strict';


var moment = require('moment');
moment().format();
const fs = require('fs');

var dict={}
function sortArrayByDate(array){
	array.sort(function (left, right) {
    return moment.utc(left.Time).diff(moment.utc(right.Time))
});
	return array;
}
let rawdata = fs.readFileSync('mydata2.json');  
let MYDATA = JSON.parse(rawdata);  

MYDATA.forEach(function(obj) {
	obj.BatteryPowerIn=Math.round(obj.BatteryPowerIn * 100) / 100
  	obj.BatteryPowerOut=Math.round(obj.BatteryPowerOut * 100) / 100
  	obj.BatteryCurrent=Math.round(obj.BatteryCurrent * 100) / 100
  	obj.USBHubCurrent=Math.round(obj.USBHubCurrent * 100) / 100
  	obj.BatteryVoltage=Math.round(obj.BatteryVoltage * 100) / 100
  	obj.Temperature=Math.round(obj.Temperature * 100) / 100
  	obj.Humidity=Math.round(obj.Humidity * 100) / 100
  	obj.PanelCurrent=Math.round(obj.PanelCurrent * 100) / 100
  	obj.Irradiance=Math.round(obj.Irradiance * 100) / 100
  var time=moment(new Date(obj.Time)).hour()
  if (!(time in dict)){
  	var temp={}
  	temp.count=1;
  	temp.BatteryPowerIn=obj.BatteryPowerIn
  	temp.BatteryPowerOut=obj.BatteryPowerOut
  	temp.BatteryCurrent=obj.BatteryCurrent
  	temp.USBHubCurrent=obj.USBHubCurrent
  	temp.BatteryVoltage=obj.BatteryVoltage
  	temp.Temperature=obj.Temperature
  	temp.Humidity=obj.Humidity
  	temp.PanelCurrent=obj.PanelCurrent
  	temp.Irradiance=obj.Irradiance
  	dict[time]=temp
  }else{
  	dict[time].BatteryPowerIn+=obj.BatteryPowerIn
  	dict[time].BatteryPowerOut+=obj.BatteryPowerOut
  	dict[time].BatteryCurrent+=obj.BatteryCurrent
  	dict[time].USBHubCurrent+=obj.USBHubCurrent
  	dict[time].BatteryVoltage+=obj.BatteryVoltage
  	dict[time].Temperature+=obj.Temperature
  	dict[time].Humidity+=obj.Humidity
  	dict[time].PanelCurrent+=obj.PanelCurrent
  	dict[time].Irradiance+=obj.Irradiance
  	dict[time].count++
  }
});

for (var i=0;i<24;i++){
	dict[i].BatteryPowerIn=dict[i].BatteryPowerIn/dict[i].count
  	dict[i].BatteryPowerOut=dict[i].BatteryPowerOut/dict[i].count
  	dict[i].BatteryCurrent=dict[i].BatteryCurrent/dict[i].count
  	dict[i].USBHubCurrent=dict[i].USBHubCurrent/dict[i].count
  	dict[i].BatteryVoltage=dict[i].BatteryVoltage/dict[i].count
  	dict[i].Temperature=dict[i].Temperature/dict[i].count
  	dict[i].Humidity=dict[i].Humidity/dict[i].count
  	dict[i].PanelCurrent=dict[i].PanelCurrent/dict[i].count
  	dict[i].Irradiance=dict[i].Irradiance/dict[i].count


  	dict[i].BatteryPowerIn=Math.round(dict[i].BatteryPowerIn * 100) / 100
  	dict[i].BatteryPowerOut=Math.round(dict[i].BatteryPowerOut * 100) / 100
  	dict[i].BatteryCurrent=Math.round(dict[i].BatteryCurrent * 100) / 100
  	dict[i].USBHubCurrent=Math.round(dict[i].USBHubCurrent * 100) / 100
  	dict[i].BatteryVoltage=Math.round(dict[i].BatteryVoltage * 100) / 100
  	dict[i].Temperature=Math.round(dict[i].Temperature * 100) / 100
  	dict[i].Humidity=Math.round(dict[i].Humidity * 100) / 100
  	dict[i].PanelCurrent=Math.round(dict[i].PanelCurrent * 100) / 100
  	dict[i].Irradiance=Math.round(dict[i].Irradiance * 100) / 100
}


let data = JSON.stringify(dict, null, 2);  
fs.writeFileSync('averagePerHour.json', data);  