'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('data1718_5.json');  
let MYDATA = JSON.parse(rawdata);  
const MongoClient = require('mongodb').MongoClient;
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("TheChargeProject").collection("data5");
  
  MYDATA.forEach(function(obj) {
  	obj.Datetime=new Date(obj.Datetime)
  	collection.insertOne(obj, (err, result) => {
  		console.log("ADDED")
})
  })
console.log("DONE")

  client.close();
});












