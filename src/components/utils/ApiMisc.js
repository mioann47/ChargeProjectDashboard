import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import * as stitch from '../stitch'

export async function loadBatteryPowerInSum() {
    let ret = {}
    try {
     
  
      await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
        await stitch.db.collection("data5").aggregate([
          {
          
          "$group": {
            "_id": null,
            "sum": { "$sum": "$BatteryPowerIn" },
          }
        },
        
        {
          "$project": {
            sum: "$sum",
          }
        }
        ]).asArray()
          .then(items => {
            
            ret=items
  
          })
      })
      
    } catch{
  
      ret = null
    }
  
    return Math.round((ret[0].sum / 1000) * 100) / 100
  }
  
export async function loadBatteryPowerOutSum() {
    let ret = {}
    try {
     
  
      await stitch.client.auth.loginWithCredential(new AnonymousCredential()).then(async function (user) {
        await stitch.db.collection("data5").aggregate([
          {
          
          "$group": {
            "_id": null,
            "sum": { "$sum": "$BatteryPowerOut" },
          }
        },
        
        {
          "$project": {
            sum: "$sum",
          }
        }
        ]).asArray()
          .then(items => {
            
            ret=items
  
          })
      })
      
    } catch{
  
      ret = null
    }
  
    return Math.round((ret[0].sum / 1000) * 100) / 100
  }

 export async function loadTempLast7Days(dateStart,datefinish) {
    let ret = {}
    try {
     
  
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
                  "_id": null,
                  "avg": { "$avg": "$Temperature" },
                }
              },
              
              {
                "$project": {
                    avg: { '$multiply': [{ "$cond": [{ "$gte": ["$avg", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$avg' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
                }
              }
        ]).asArray()
          .then(items => {
            
            ret=items
          })
      })
      
    } catch{
  
      ret = null
    }
  
    return ret[0].avg
  } 
  export async function loadHumidityLast7Days(dateStart,datefinish) {
    let ret = {}
    try {
     
  
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
                  "_id": null,
                  "avg": { "$avg": "$Humidity" },
                }
              },
              
              {
                "$project": {
                    avg: { '$multiply': [{ "$cond": [{ "$gte": ["$avg", 0] }, 1, -1] }, { '$divide': [{ '$trunc': { '$add': [{ '$multiply': [{ '$abs': '$avg' }, { '$pow': [10, 2] }] }, 0.5] } }, { '$pow': [10, 2] }] }] },
                }
              }
        ]).asArray()
          .then(items => {
            
            ret=items
          })
      })
      
    } catch{
  
      ret = null
    }
  
    return ret[0].avg
  } 