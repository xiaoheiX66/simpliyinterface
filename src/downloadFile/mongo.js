const { MongoClient } = require('mongodb')
// 创建客户端对象
// 
const url = 'mongodb://localhost:27017/';
const dbName = 'drinkRegList'
// MongoClinent.connect(url,(err,client)=>{})
const client = new MongoClient(url);
// 连接数据库
client.connect().then(()=>{
    const db = client.db(dbName)
    // 匹配集合/选择集合
    const acol = db.collection('user')
    let cursor =acol.find()
    // const res = await cursor.toArray()
    console.log("res",cursor);

    client.close()
}) 