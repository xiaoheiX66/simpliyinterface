const express = require('express')
const mysql = require('mysql')
const db = require('../db/normalSql')
const bodyParser = require('body-parser');
const {token} = require('../utils');
const Pool = require('mysql/lib/Pool');
const router = express.Router()
module.exports = router;

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"Xn",
//     password:"123456",
//     database:"databasetest"
// })

// 成员登录
router.get("/login", async (req,res)=>{
   const {username,password,mdl} = req.query;
//    console.log("reqlogin",req.query);
   let sql = `select * from users where username='${username}' and password='${password}'`;
   let ret = await db.query(sql)
   if(ret.length>0){
    // 设置7天免登录
    let authorization;
    if(mdl === 'true'){
        authorization=token.create({username},'7d')
    }else{
        authorization = token.create({username})
    }
    ret[0].authorization = authorization;
    res.send({code:200,msg:"登陆成功",info:ret[0]})
   }else{
       res.send({code:400,msg:"登陆失败"})
   }
})
// 校验token
router.get("/verify", async (req,res)=>{
    let Authorization = req.get('Authorization')
    // const {username} = req.query;
    // const userinfos = await db.query(colName,{username})
    // console.log("usernmae"+username,"userinfos",userinfos);
    console.log("Authorization",Authorization);
    const result = await token.verify(Authorization)
    if(result){
        res.send({code:200,msg:"登录成功",info:result})
    }else{
        res.send({code:400,msg:"登录失败",info:result})
    }
})

// 成员注册
// let bodyParser2 = bodyParser.urlencoded({extended:true})
router.post("/reg", async (req,res)=>{
    let {username,password} = req.body
    console.log("注册",req.body);
    let sql2 = `select * from users`;
    let ret2 = await db.query(sql2)
    let ret = await db.query(`SELECT * FROM users WHERE username='${username}'`);
    console.log("ret",ret);
    if(ret2.length>0){
        let idx = ret2.length+1;
        let sql = `insert into users values('${idx}','${username}','${password}')`;
    if(!ret[0]){
       await db.query(sql)
        res.send({code:200,msg:"注册成功"})
        return;
    }
    res.send({code:400,msg:"用户名已存在,请重新注册"})
    }else{
        console.log("查询失败");
    }
    
})

// })
// 成员列表查询
router.get("/list", async (req,res)=>{
    let sql =`select * from users`;
    let ret = await db.query(sql)
    if(ret.length>0){
        res.send({code:200,msg:"搜索成功",info:ret})
    }else{
        res.send({code:400,msg:"搜索失败"})
    }
})
// 成员个体查询
router.get("/:id", async (req,res)=>{
    const { id } = req.params
    let sql = `select * from users where id='${id}'`;
   let ret = await db.query(sql)
   if(ret.length>0){
    res.send({code:200,msg:"查询成功",info:ret})
   }else{
       res.send({code:400,msg:"查询失败"})
   }
})
router.post("/checks", async (req,res)=>{
    const { username } = req.body
    let sql = `select * from users where username like '${username}%'`;
    console.log("sql",sql);
   let ret = await db.query(sql)
   console.log("ret",ret);
   if(ret.length>0){
    res.send({code:200,msg:"查询成功",info:ret})
   }else{
       res.send({code:400,msg:"查询失败"})
   }
})
// 成员个体删除
router.delete("/del/:id", async (req,res)=>{
    const { id } = req.params;
    console.log("delid",req.params);
    let sql =`delete from users where id='${id}'`;
   let ret = await db.query(sql)
   if(!ret[0]){
    res.send({code:200,msg:"删除成功"})
   }else{
       res.send({code:400,msg:"删除失败"})
   }
})