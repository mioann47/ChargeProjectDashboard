const API = require('./APIYearly');
test('load loadBatteryPowerInYearlySum() data length to be equal 2', async () => {
    const result = await API.loadBatteryPowerInYearlySum()
    expect(result.length).toBe(2);
});
test('load loadBatteryPowerOutYearlySum() data length to be equal 2', async () => {
    const result = await API.loadBatteryPowerOutYearlySum()
    expect(result.length).toBe(2);
});
test('load loadBatteryPowerInOutYearlySum() data length to be equal 2', async () => {
    const result = await API.loadBatteryPowerInOutYearlySum()
    expect(result.length).toBe(2);
});
test('load loadBatteryVoltageYearlyAvg() data length to be equal 2', async () => {
    const result = await API.loadBatteryVoltageYearlyAvg()
    expect(result.length).toBe(2);
});
test('load loadPanelCurrentYearlySum() data length to be equal 2', async () => {
    const result = await API.loadPanelCurrentYearlySum()
    expect(result.length).toBe(2);
});
test('load loadUSBCurrentYearlySum() data length to be equal 2', async () => {
    const result = await API.loadUSBCurrentYearlySum()
    expect(result.length).toBe(2);
});
test('load loadBatteryCurrentYearlySum() data length to be equal 2', async () => {
    const result = await API.loadBatteryCurrentYearlySum()
    expect(result.length).toBe(2);
});
test('load loadCurrentsYearlySum() data length to be equal 2', async () => {
    const result = await API.loadCurrentsYearlySum()
    expect(result.length).toBe(2);
});
test('load loadTemperatureYearlyAvg() data length to be equal 2', async () => {
    const result = await API.loadTemperatureYearlyAvg()
    expect(result.length).toBe(2);
});
test('load loadHumidityYearlyAvg() data length to be equal 2', async () => {
    const result = await API.loadHumidityYearlyAvg()
    expect(result.length).toBe(2);
});
test('load loadIrradianceYearlyAvg() data length to be equal 2', async () => {
    const result = await API.loadIrradianceYearlyAvg()
    expect(result.length).toBe(2);
});