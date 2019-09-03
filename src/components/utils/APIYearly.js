import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import * as stitch from '../stitch'
import * as moment from 'moment';


export async function loadBatteryPowerInYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
        
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.value = Math.round((e.value / 1000) * 100) / 100
            e.id=''+e.id
          })

          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}


export async function loadBatteryPowerOutYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
       {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.value = Math.round((e.value / 1000) * 100) / 100
            e.id=''+e.id
          })

          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryPowerInOutYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        
        {
          "$group": {
            // _id: { month: { $month: "$Datetime" }, year: { $year: "$Datetime" } },
            _id: { year: { $year: "$Datetime" } },
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
            e.year=''+e._id.year
            e["Battery Power In"] = Math.round((e["Battery Power In"] / 1000) * 100) / 100
            e["Battery Power Out"] = Math.round((e["Battery Power Out"] / 1000) * 100) / 100
            //e.year = e._id.year
          })

          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}



export async function loadBatteryVoltageYearlyAvg() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
       
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
        
          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadPanelCurrentYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
            

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}


export async function loadUSBCurrentYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
           

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadBatteryCurrentYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadCurrentsYearlySum() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
          "$group": {
            // _id: { month: { $month: "$Datetime" }, year: { $year: "$Datetime" } },
            _id: { year: { $year: "$Datetime" } },
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
            e.year = e._id.year
           
          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadTemperatureYearlyAvg() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
           

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadHumidityYearlyAvg() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
           
          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}

export async function loadIrradianceYearlyAvg() {
  let ret = {}
  try {
   

    await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
      await stitch.db.collection("data5").aggregate([
        
        {
        "$group": {
          "_id": { '$year': "$Datetime" },
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
            e.num=e.id+''
            e.value = Math.round((e.value) * 100) / 100
           

          })


          ret=items

        })
    })
    
  } catch{

    ret = null
  }

  return ret
}