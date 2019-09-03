
const API = require('./ApiMisc');
test('load loadBatteryPowerInSum() data to be >1',async () => {
  const result= await API.loadBatteryPowerInSum()
  expect(result).toBeGreaterThanOrEqual(1);
});

test('load loadBatteryPowerOutSum() data to be >1',async () => {
  const result= await API.loadBatteryPowerOutSum()
  expect(result).toBeGreaterThanOrEqual(1);
});

test('load loadTempLast7Days() data to be >1',async () => {
  const result= await API.loadTempLast7Days('2017-02-10','2017-02-17')
  expect(result).toBeGreaterThanOrEqual(1);
});
test('load loadHumidityLast7Days() data to be >1',async () => {
  const result= await API.loadHumidityLast7Days('2017-02-10','2017-02-17')
  expect(result).toBeGreaterThanOrEqual(1);
});