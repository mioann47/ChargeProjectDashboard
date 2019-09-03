
const API = require('./API');
test('load BatteryPowersDailyPerHour() data length to be >1',async () => {
  const result= await API.loadBatteryPowersDailyPerHour('2017-02-27','2017-03-15')
  const keys=Object.keys(result)
  expect(keys.length).toBeGreaterThanOrEqual(1);
  keys.forEach(k=>{
      expect(result[k].data.length).toBeGreaterThanOrEqual(1);
  })
  
});

test('load loadBatteryPowersDailyTotal() data length to be >1',async () => {
    const result= await API.loadBatteryPowersDailyTotal('2017-02-27','2017-03-15')
    const keys=Object.keys(result)
    expect(keys.length).toBeGreaterThanOrEqual(1);
    keys.forEach(k=>{
        expect(result[k].data.length).toBeGreaterThanOrEqual(1);
    })
    
  });

  test('load loadBatteryVoltagesDailyPerHour() data length to be >1',async () => {
    const result= await API.loadBatteryVoltagesDailyPerHour('2017-02-27','2017-03-15')

    expect(result.data.length).toBeGreaterThanOrEqual(1);
    
    
  });
  test('load loadCurrentsDailyPerHour() data length to be >1',async () => {
    const result= await API.loadCurrentsDailyPerHour('2017-02-27','2017-03-15')
    const keys=Object.keys(result)
    expect(keys.length).toBeGreaterThanOrEqual(1);
    keys.forEach(k=>{
        expect(result[k].data.length).toBeGreaterThanOrEqual(1);
    })
    
  });

  test('load loadCurrentsDailyTotal() data length to be >1',async () => {
    const result= await API.loadCurrentsDailyTotal('2017-02-27','2017-03-15')
    const keys=Object.keys(result)
    expect(keys.length).toBeGreaterThanOrEqual(1);
    keys.forEach(k=>{
        expect(result[k].data.length).toBeGreaterThanOrEqual(1);
    })
    
  });
  test('load loadIrradiancesDailyPerHour() data length to be >1',async () => {
    const result= await API.loadIrradiancesDailyPerHour('2017-02-27','2017-03-15')

    expect(result.irradiance.data.length).toBeGreaterThanOrEqual(1);
    
    
  });
  test('load loadIrradiancesDailyAverage() data length to be >1',async () => {
    const result= await API.loadIrradiancesDailyAverage('2017-02-27','2017-03-15')

    expect(result.irradiance.data.length).toBeGreaterThanOrEqual(1);
    
    
  });

  test('load loadTemperatureDailyPerHour() data length to be >1',async () => {
    const result= await API.loadTemperatureDailyPerHour('2017-02-27','2017-03-15')

    expect(result.temperature.data.length).toBeGreaterThanOrEqual(1);
    
    
  });

  test('load loadTemperatureDailyAverage() data length to be >1',async () => {
    const result= await API.loadTemperatureDailyAverage('2017-02-27','2017-03-15')

    expect(result.temperature.data.length).toBeGreaterThanOrEqual(1);
    
    
  });
  test('load loadHumidityDailyPerHour() data length to be >1',async () => {
    const result= await API.loadHumidityDailyPerHour('2017-02-27','2017-03-15')

    expect(result.humidity.data.length).toBeGreaterThanOrEqual(1);
    
    
  });
  test('load loadHumidityDailyAverage() data length to be >1',async () => {
    const result= await API.loadHumidityDailyAverage('2017-02-27','2017-03-15')

    expect(result.humidity.data.length).toBeGreaterThanOrEqual(1);
    
    
  });