'use strict';
var moment = require('moment');
moment().format();
const fs = require('fs');
let rawdata = fs.readFileSync('averagePerHour.json');  
let dict = JSON.parse(rawdata);  

var finishDate=moment(new Date("2018-12-31T23:00:00.000Z"));
var startDate=moment(new Date("2017-01-01T00:00:00.000Z"))
var array=[]
var tempoffset=0;
var prevDw=1;

while(finishDate>=startDate){
var date=startDate
var dt={}
dt.Datetime=startDate.toISOString();
dt.Date = moment(startDate).format('YYYY-MM-DD');
dt.Time = moment(startDate).format('HH:mm:ss');
var hour=startDate.hour()

//Battery Power In
if (dict[hour].BatteryPowerIn===0){
	dt.BatteryPowerIn=0;
}else{
	dt.BatteryPowerIn=Math.floor(Math.random() * 5)+dict[hour].BatteryPowerIn-2
}
if (dt.BatteryPowerIn<0){
	dt.BatteryPowerIn=0
}

//Battery Power Out
dt.BatteryPowerOut=Math.floor(Math.random() * 10)+dict[hour].BatteryPowerOut-3
if (dt.BatteryPowerIn<10){
	dt.BatteryPowerIn=10.2
}

//Battery Current
if (dict[hour].BatteryCurrent===0){
	dt.BatteryCurrent=0;
}else{
	dt.BatteryCurrent=Math.random() +dict[hour].BatteryCurrent-0.3
}
if (dt.BatteryCurrent<0){
	dt.BatteryCurrent=0
}

//USBHub Current
dt.USBHubCurrent=Math.random() +dict[hour].USBHubCurrent-0.75
if (dt.USBHubCurrent<0.5){
	dt.USBHubCurrent=0.64
}

dt.BatteryVoltage=dict[hour].BatteryVoltage-0.1+(Math.round(Math.random()*10)/100)

var dw=date.week()
if (prevDw!=dw){
if(dw==1){
 tempoffset=0
}else if (dw<30){
  tempoffset=tempoffset+0.5;
}else if (dw<35){

}else if (dw<53){
  tempoffset=tempoffset-0.83;
}
prevDw=dw
}
var c=date.month()+1
switch (c) {
  case 12:
    dt.Temperature=Math.floor(Math.random() * 3)+dict[hour].Temperature+tempoffset
    break;
  case 1:
    dt.Temperature=Math.floor(Math.random() * 2)+dict[hour].Temperature+tempoffset
    break;
  case 2:
  	dt.Temperature=Math.floor(Math.random() * 3)+dict[hour].Temperature+tempoffset
    break;
  case 3:
    dt.Temperature=Math.floor(Math.random() * 4)+dict[hour].Temperature+tempoffset
    break;
  case 4:
    dt.Temperature=Math.floor(Math.random() * 5)+dict[hour].Temperature+tempoffset
    break;
  case 5:
    dt.Temperature=Math.floor(Math.random() * 5)+dict[hour].Temperature+tempoffset
    break;
  case 6:
    dt.Temperature=Math.floor(Math.random() * 6)+dict[hour].Temperature+tempoffset
    break;
  case 7:
    dt.Temperature=Math.floor(Math.random() * 6)+dict[hour].Temperature+tempoffset
    break;
  case 8:
    dt.Temperature=Math.floor(Math.random() * 6)+dict[hour].Temperature+tempoffset
    break;
  case 9:
    dt.Temperature=Math.floor(Math.random() * 5)+dict[hour].Temperature+tempoffset
    break;
  case 10:
    dt.Temperature=Math.floor(Math.random() * 4)+dict[hour].Temperature+tempoffset
    break;
  case 11:
    dt.Temperature=Math.floor(Math.random() * 3)+dict[hour].Temperature+tempoffset
    break;
}




dt.Humidity=Math.floor(Math.random() * 10)+Math.round(Math.random()*10)/10+dict[hour].Humidity-5
if (dt.Humidity>=100){
	dt.Humidity=98.9+Math.round(Math.random()*10)/10
}

dt.PanelCurrent=Math.round(Math.random()*41)/100+dict[hour].PanelCurrent-0.1


if (dict[hour].Irradiance<100){
	dt.Irradiance=Math.floor(Math.random() * 6)+dict[hour].Irradiance-3
}else{
	dt.Irradiance=Math.floor(Math.random() * 40)+dict[hour].Irradiance-20
}


  	dt.BatteryPowerIn=Math.round(dt.BatteryPowerIn)
  	dt.BatteryPowerOut=Math.round(dt.BatteryPowerOut)
  	dt.BatteryCurrent=Math.round(dt.BatteryCurrent * 100) / 100
  	dt.USBHubCurrent=Math.round(dt.USBHubCurrent * 100) / 100
  	dt.BatteryVoltage=Math.round(dt.BatteryVoltage * 100) / 100
  	dt.Temperature=Math.round(dt.Temperature * 100) / 100
  	dt.Humidity=Math.round(dt.Humidity)
  	dt.PanelCurrent=Math.round(dt.PanelCurrent * 1000) / 1000
  	dt.Irradiance=Math.round(dt.Irradiance)
  	


array.push(dt)

startDate.add(1,'h')
}




let data = JSON.stringify(array, null, 2);  
fs.writeFileSync('data1718_5.json', data);  