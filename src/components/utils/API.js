import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import * as stitch from '../stitch'
import moment from 'moment';


export async function loadBatteryPowersDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var bIn = {
      id: 'Battery Power In',
      data: []
    };
    var bOut = {
      id: 'Battery Power Out',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },

        { "$sort": { Datetime: 1 } },

        {
          "$project": {
            _id: 0,
            Datetime: 1,
            BatteryPowerIn: 1,
            BatteryPowerOut: 1,
          }
        }
      ]).asArray()
        .then(items => {


          items.forEach(e => {
            bIn.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.BatteryPowerIn
            });

            bOut.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.BatteryPowerOut
            })

          })



        })
    })
    ret = {
      BatteryPowerIn: bIn,
      BatteryPowerOut: bOut
    }
  } catch(e){
console.log(e)
    ret = null
  }

  return ret
}

export async function loadBatteryPowersDailyTotal(dStart, dEnd) {

  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var bIn = {
      id: 'Battery Power In',
      data: []
    };
    var bOut = {
      id: 'Battery Power Out',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },
        {
          "$group": {
            "_id": "$Date",
            "bIn": { "$sum": "$BatteryPowerIn" },
            "bOut": { "$sum": "$BatteryPowerOut" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {

            //https://stackoverflow.com/questions/17482623/rounding-to-2-decimal-places-using-mongodb-aggregation-framework
            bIn: { '$multiply': [{ "$cond": [{ "$gte": ["$bIn", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$bIn' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            bOut: { '$multiply': [{ "$cond": [{ "$gte": ["$bOut", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$bOut' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            _id: 1,
          }
        },

      ]).asArray()
        .then(items => {

          items.forEach(e => {
            bIn.data.push({
              x: e._id,
              y: Math.round((e.bIn / 1000) * 100) / 100
            });

            bOut.data.push({
              x: e._id,
              y: Math.round((e.bOut / 1000) * 100) / 100
            })

          })



        })
    })
    ret = {
      BatteryPowerIn: bIn,
      BatteryPowerOut: bOut
    }
  } catch (e) {
    console.log(e)
    ret = null
  }

  return ret




}


export async function loadBatteryVoltagesDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var volts = {
      id: 'Battery Voltage',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },

        { "$sort": { Datetime: 1 } },

        {
          "$project": {
            _id: 0,
            Datetime: 1,
            BatteryVoltage: 1
          }
        }
      ]).asArray()
        .then(items => {


          items.forEach(e => {
            volts.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.BatteryVoltage
            });

          })




        })
    })
    ret = volts
  } catch (e) {
    console.log(e)
    ret = null
  }

  return ret
}

export async function loadCurrentsDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var panel = {
      id: 'Panel Current',
      data: []
    };
    var usb = {
      id: 'USB Hub Current',
      data: []
    };
    var battery = {
      id: 'Battery Current',
      data: []
    };


    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },

        { "$sort": { Datetime: 1 } },

        {
          "$project": {
            _id: 0,
            Datetime: 1,
            BatteryCurrent: 1,
            USBHubCurrent: 1,
            PanelCurrent: 1,
          }
        }
      ]).asArray()
        .then(items => {


          items.forEach(e => {
            panel.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.PanelCurrent
            });

            usb.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.USBHubCurrent
            })
            battery.data.push({
              x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
              y: e.BatteryCurrent
            })

          })



        })
    })
    ret = {
      panel: panel,
      usb: usb,
      battery:battery
    }
  } catch{

    ret = null
  }

  return ret
}

export async function loadCurrentsDailyTotal(dStart, dEnd) {
  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var panel = {
      id: 'Panel Current',
      data: []
    };
    var usb = {
      id: 'USB Hub Current',
      data: []
    };
    var battery = {
      id: 'Battery Current',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },
        {
          "$group": {
            "_id": "$Date",
            "PanelCurrentSum": { "$sum": "$PanelCurrent" },
            "USBHubCurrentSum": { "$sum": "$USBHubCurrent" },
            "BatteryCurrentSum": { "$sum": "$BatteryCurrent" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {

            //https://stackoverflow.com/questions/17482623/rounding-to-2-decimal-places-using-mongodb-aggregation-framework
            PanelCurrentSum: { '$multiply': [{ "$cond": [{ "$gte": ["$PanelCurrentSum", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$PanelCurrentSum' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            USBHubCurrentSum: { '$multiply': [{ "$cond": [{ "$gte": ["$USBHubCurrentSum", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$USBHubCurrentSum' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            BatteryCurrentSum: { '$multiply': [{ "$cond": [{ "$gte": ["$BatteryCurrentSum", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$BatteryCurrentSum' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            _id: 1,
          }
        },

      ]).asArray()
        .then(items => {


          items.forEach(e => {
            panel.data.push({
              x:  e._id,
              y: Math.round(e.PanelCurrentSum * 100) / 100
            });

            usb.data.push({
              x:  e._id,
              y: Math.round(e.USBHubCurrentSum * 100) / 100
            })
            battery.data.push({
              x:  e._id,
              y: Math.round(e.BatteryCurrentSum * 100) / 100
            })

          })



        })
    })
    ret = {
      panel: panel,
      usb: usb,
      battery:battery
    }
  } catch{

    ret = null
  }

  return ret
}

export async function loadIrradiancesDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
  var dateStart = (moment(dStart).hour(0)).toDate()
  var datefinish = (moment(dEnd).hour(23)).toDate()
  var i = {
    id: 'Irradiance',
    data: []
  };

  await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
    await stitch.db.collection("data5").aggregate([

      {
        "$match": {
          Datetime: {
            $gte: new Date(dateStart),
            $lte: new Date(datefinish)
          }
        }
      },

      { "$sort": { Datetime: 1 } },

      {
        "$project": {
          _id: 0,
          Datetime: 1,
          Irradiance: 1
        }
      }
    ]).asArray()
      .then(items => {


        items.forEach(e => {
          i.data.push({
            x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
            y: e.Irradiance
          });

        })


        

      })
    })
    ret = {
      irradiance: i,
    }
  } catch{

    ret = null
  }

  return ret
}

export async function loadIrradiancesDailyAverage(dStart, dEnd) {

  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var i = {
      id: 'Irradiances',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },
        {
          "$group": {
            "_id": "$Date",
            "avg": { "$sum": "$Irradiances" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {

            //https://stackoverflow.com/questions/17482623/rounding-to-2-decimal-places-using-mongodb-aggregation-framework
            avg: { '$multiply': [{ "$cond": [{ "$gte": ["$avg", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$avg' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            _id: 1,
          }
        },

      ]).asArray()
        .then(items => {

          items.forEach(e => {
            i.data.push({
              x: e._id,
              y: Math.round(e.avg * 100) / 100
            });

           

          })



        })
    })
    ret = {
      irradiance: i,
    }
  } catch (e) {
    console.log(e)
    ret = null
  }

  return ret




}


export async function loadTemperatureDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
  var dateStart = (moment(dStart).hour(0)).toDate()
  var datefinish = (moment(dEnd).hour(23)).toDate()
  var t = {
    id: 'Temperature',
    data: []
  };

  await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
    await stitch.db.collection("data5").aggregate([

      {
        "$match": {
          Datetime: {
            $gte: new Date(dateStart),
            $lte: new Date(datefinish)
          }
        }
      },

      { "$sort": { Datetime: 1 } },

      {
        "$project": {
          _id: 0,
          Datetime: 1,
          Temperature: 1
        }
      }
    ]).asArray()
      .then(items => {


        items.forEach(e => {
          t.data.push({
            x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
            y: e.Temperature
          });

        })


        

      })
    })
    ret = {
      temperature: t,
    }
  } catch{

    ret = null
  }

  return ret
}

export async function loadTemperatureDailyAverage(dStart, dEnd) {

  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var t = {
      id: 'Temperature',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },
        {
          "$group": {
            "_id": "$Date",
            "avg": { "$avg": "$Temperature" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {

            //https://stackoverflow.com/questions/17482623/rounding-to-2-decimal-places-using-mongodb-aggregation-framework
            avg: { '$multiply': [{ "$cond": [{ "$gte": ["$avg", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$avg' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            _id: 1,
          }
        },

      ]).asArray()
        .then(items => {

          items.forEach(e => {
            t.data.push({
              x: e._id,
              y: Math.round(e.avg * 100) / 100
            });

           

          })



        })
    })
    ret = {
      temperature: t,
    }
  } catch (e) {
    console.log(e)
    ret = null
  }

  return ret




}


export async function loadHumidityDailyPerHour(dStart, dEnd) {
  let ret = {}
  try {
  var dateStart = (moment(dStart).hour(0)).toDate()
  var datefinish = (moment(dEnd).hour(23)).toDate()
  var h = {
    id: 'Humidity',
    data: []
  };

  await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
    await stitch.db.collection("data5").aggregate([

      {
        "$match": {
          Datetime: {
            $gte: new Date(dateStart),
            $lte: new Date(datefinish)
          }
        }
      },

      { "$sort": { Datetime: 1 } },

      {
        "$project": {
          _id: 0,
          Datetime: 1,
          Humidity: 1
        }
      }
    ]).asArray()
      .then(items => {


        items.forEach(e => {
          h.data.push({
            x: e.Datetime.toISOString().split(':00.000')[0] + "Z",
            y: e.Humidity
          });

        })


        

      })
    })
    ret = {
      humidity: h,
    }
  } catch{

    ret = null
  }

  return ret
}

export async function loadHumidityDailyAverage(dStart, dEnd) {

  let ret = {}
  try {
    var dateStart = (moment(dStart).hour(0)).toDate()
    var datefinish = (moment(dEnd).hour(23)).toDate()
    var h = {
      id: 'Humidity',
      data: []
    };

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([

        {
          "$match": {
            Datetime: {
              $gte: new Date(dateStart),
              $lte: new Date(datefinish)
            }
          }
        },
        {
          "$group": {
            "_id": "$Date",
            "avg": { "$avg": "$Humidity" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {

            //https://stackoverflow.com/questions/17482623/rounding-to-2-decimal-places-using-mongodb-aggregation-framework
            avg: { '$multiply': [{ "$cond": [{ "$gte": ["$avg", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$avg' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
            _id: 1,
          }
        },

      ]).asArray()
        .then(items => {

          items.forEach(e => {
            h.data.push({
              x: e._id,
              y: Math.round(e.avg * 100) / 100
            });

           

          })



        })
    })
    ret = {
      humidity: h,
    }
  } catch (e) {
    console.log(e)
    ret = null
  }

  return ret




}

