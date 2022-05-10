"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient; // 创建客户端对象
// 


var url = 'mongodb://localhost:27017/';
var dbName = 'drinkRegList'; // MongoClinent.connect(url,(err,client)=>{})

var client = new MongoClient(url); // 连接数据库

client.connect().then(function () {
  var db = client.db(dbName); // 匹配集合/选择集合

  var acol = db.collection('user');
  var cursor = acol.find(); // const res = await cursor.toArray()

  console.log("res", cursor);
  client.close();
});