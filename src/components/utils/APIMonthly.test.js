const API = require('./APIMonthly');
test('load loadBatteryPowerInMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadBatteryPowerInMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadBatteryPowerOutMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadBatteryPowerOutMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadBatteryPowerInOutMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadBatteryPowerInOutMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadBatteryVoltageMonthlyAvg() data length to be equal 12', async () => {
    const result = await API.loadBatteryVoltageMonthlyAvg(2017)
    expect(result.length).toBe(12);
});

test('load loadPanelCurrentMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadPanelCurrentMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadUSBCurrentMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadUSBCurrentMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadBatteryCurrentMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadBatteryCurrentMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadCurrentsMonthlySum() data length to be equal 12', async () => {
    const result = await API.loadCurrentsMonthlySum(2017)
    expect(result.length).toBe(12);
});

test('load loadTemperatureMonthlyAvg() data length to be equal 12', async () => {
    const result = await API.loadTemperatureMonthlyAvg(2017)
    expect(result.length).toBe(12);
});

test('load loadHumidityMonthlyAvg() data length to be equal 12', async () => {
    const result = await API.loadHumidityMonthlyAvg(2017)
    expect(result.length).toBe(12);
});
test('load loadIrradianceMonthlyAvg() data length to be equal 12', async () => {
    const result = await API.loadIrradianceMonthlyAvg(2017)
    expect(result.length).toBe(12);
});