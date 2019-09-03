import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import * as stitch from '../stitch'
import * as moment from 'moment';


export async function loadBatteryPowerInMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "sum": { "$sum": "$BatteryPowerIn" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$sum",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value / 1000) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryPowerOutMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "sum": { "$sum": "$BatteryPowerOut" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$sum",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value / 1000) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryPowerInOutMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
          "$group": {
            // _id: { month: { $month: "$Datetime" }, year: { $year: "$Datetime" } },
            _id: { month: { $month: "$Datetime" } },
            "Battery Power In": { "$sum": "$BatteryPowerIn" },
            "Battery Power Out": { "$sum": "$BatteryPowerOut" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {
            _id: 1,
            "Battery Power In": 1,
            "Battery Power Out": 1,

          }
        }
      ]).asArray()
        .then(items => {

        
          items.forEach(e => {
            e["Battery Power In"] = Math.round((e["Battery Power In"] / 1000) * 100) / 100
            e["Battery Power Out"] = Math.round((e["Battery Power Out"] / 1000) * 100) / 100
            //e.year = e._id.year
            e.num = e._id.month
            if (e._id.month === 1) {
              e.month = "January"
            }
            if (e._id.month === 2) {
              e.month = "February"
            }
            if (e._id.month === 3) {
              e.month = "March"
            }
            if (e._id.month === 4) {
              e.month = "April"
            }
            if (e._id.month === 5) {
              e.month = "May"
            }
            if (e._id.month === 6) {
              e.month = "June"
            }
            if (e._id.month === 7) {
              e.month = "July"
            }
            if (e._id.month === 8) {
              e.month = "August"
            }
            if (e._id.month === 9) {
              e.month = "September"
            }
            if (e._id.month === 10) {
              e.month = "October"
            }
            if (e._id.month === 11) {
              e.month = "November"
            }
            if (e._id.month === 12) {
              e.month = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryVoltageMonthlyAvg(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "avg": { "$avg": "$BatteryVoltage" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$avg",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadPanelCurrentMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "sum": { "$sum": "$PanelCurrent" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$sum",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadUSBCurrentMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "sum": { "$sum": "$USBHubCurrent" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$sum",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryCurrentMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "sum": { "$sum": "$BatteryCurrent" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$sum",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadCurrentsMonthlySum(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
          "$group": {
            // _id: { month: { $month: "$Datetime" }, year: { $year: "$Datetime" } },
            _id: { month: { $month: "$Datetime" } },
            "Battery Current": { "$sum": "$BatteryCurrent" },
            "USB Hub Current": { "$sum": "$USBHubCurrent" },
            "Panel Current": { "$sum": "$PanelCurrent" },
          }
        },
        { "$sort": { "_id": 1 } },
        {
          "$project": {
            _id: 1,
            "Battery Current": 1,
            "USB Hub Current": 1,
            "Panel Current": 1,
          }
        }
      ]).asArray()
        .then(items => {

        
          items.forEach(e => {
            e["Battery Current"] = Math.round((e["Battery Current"] ) * 100) / 100
            e[ "USB Hub Current"] = Math.round((e[ "USB Hub Current"] ) * 100) / 100
            e[ "Panel Current"] = Math.round((e[ "Panel Current"] ) * 100) / 100
            //e.year = e._id.year
            e.num = e._id.month
            if (e._id.month === 1) {
              e.month = "January"
            }
            if (e._id.month === 2) {
              e.month = "February"
            }
            if (e._id.month === 3) {
              e.month = "March"
            }
            if (e._id.month === 4) {
              e.month = "April"
            }
            if (e._id.month === 5) {
              e.month = "May"
            }
            if (e._id.month === 6) {
              e.month = "June"
            }
            if (e._id.month === 7) {
              e.month = "July"
            }
            if (e._id.month === 8) {
              e.month = "August"
            }
            if (e._id.month === 9) {
              e.month = "September"
            }
            if (e._id.month === 10) {
              e.month = "October"
            }
            if (e._id.month === 11) {
              e.month = "November"
            }
            if (e._id.month === 12) {
              e.month = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadTemperatureMonthlyAvg(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "avg": { "$avg": "$Temperature" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$avg",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadHumidityMonthlyAvg(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "avg": { "$avg": "$Humidity" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$avg",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadIrradianceMonthlyAvg(yearMatch) {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$addFields": {
            year: { $year: "$Datetime" }
          }
        },
        { $match: { year: yearMatch } },
        {
        "$group": {
          "_id": { '$month': "$Datetime" },
          "avg": { "$avg": "$Irradiance" },
        }
      },
      { "$sort": { "_id": 1 } },
      
      {
        "$project": {
          _id: 0,
          id: "$_id",
          value: "$avg",
        }
      }
      ]).asArray()
        .then(items => {

          
          items.forEach(e => {
            e.num=e.id
            e.value = Math.round((e.value) * 100) / 100
            if (e.id === 1) {
              e.id = "January"
            }
            if (e.id === 2) {
              e.id = "February"
            }
            if (e.id === 3) {
              e.id = "March"
            }
            if (e.id === 4) {
              e.id = "April"
            }
            if (e.id === 5) {
              e.id = "May"
            }
            if (e.id === 6) {
              e.id = "June"
            }
            if (e.id === 7) {
              e.id = "July"
            }
            if (e.id === 8) {
              e.id = "August"
            }
            if (e.id === 9) {
              e.id = "September"
            }
            if (e.id === 10) {
              e.id = "October"
            }
            if (e.id === 11) {
              e.id = "November"
            }
            if (e.id === 12) {
              e.id = "December"
            }

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}