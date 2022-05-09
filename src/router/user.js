const express = require('express')
// const mysql = require('mysql')
const router = express.Router()
module.exports = router;

const db = require('../db')
const colName = 'users'
const { formParams, token } = require('../utils')
// 登录
// router.get("/login", async (req,res)=>{
//     const {username,password} = req.query
//     const result =  await db.query(colName,{username,password},{projection:{password:0}})
//     if(result.length>0){
//         res.send({code:200,msg:result})
//     }else{
//         res.send({code:400,msg:"用户名或密码错误"})
//     }
// })
// 免密7天登录
router.post("/login", async (req,res)=>{
    const {username,password,mdl} = req.body
    console.log("req.query",req.body);
    const result =  await db.query(colName,{username,password},{projection:{password:0}})
    let Authorization;
    if(result.length>0){
        // 判断是否选择7天免登录
        if(mdl === 'true'){
            // 生成有效期为7天的token
           Authorization = token.create({username},'7d')
        }else{
            Authorization = token.create({username})
        }
        // 后端设置cookie
        // res.set({
        //     'Set-Cookie':`Authorization=${Authorization}`
        // })
        result[0].Authorization = Authorization;
        res.send({code:200,msg:"登陆成功",info:result})
    }else{
        res.send({code:400,msg:"用户名或密码错误"})
    }
})
// 注册
router.post("/reg", async (req,res)=>{
    const { username,password } = req.body
    console.log("账户密码req.body",req.body);
    const result = await db.insert(colName,{username,password})
    console.log("result",result);
    if(result){
        res.send({code:200,msg:"注册成功"})
    }else{
        res.send({code:400,msg:"注册失败"})
    }
})
// 添加成员
router.post("/addUser", async (req,res)=>{
    const { username,password } = req.body
    // console.log("账户密码req.body",req.body);
    const result = await db.insert(colName,{username,password})
    
    // console.log("result",result);
    if(result){
        const userres = await db.query(colName,{username})
        res.send({code:200,msg:"添加成功",info:userres})
    }else{
        res.send({code:400,msg:"添加失败"})
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

// 获取人群信息
router.get("/moreList", async (req,res)=>{
    const {page=1,size=5} = req.query;
    console.log("获取人群信息相关内容",req.query);
    // 计算跳过的数量与限制数量
    const skip = (page-1)*size;
    const limit = Number(size);
    const result = await db.query(colName,{},{
        skip,limit,projection:{
            password:0
        }
    })
    if(result){
        res.send({code:200,msg:result,total:20})
    }else{
        res.send({code:400,msg:"查询失败"})
    }
})
// 更新单人信息
router.put("/:id", async (req,res)=>{
    const {id} = req.params;
    // console.log("req.params",req.params);
    const {username,password} = req.body;

    const newData = formParams(req.body,["username","password"])
    if(username){
        newData.username = username
    }
    if(password){
        newData.password = password
    }
    try{
        await db.update(colName,{_id:id},{$set:newData})
       res.send({code:200,info:'更新成功',msg:newData})
    }catch(err){
       res.send({code:400,info:'更新失败'})
    }
})

// 删除单人信息
router.delete("/:_id", async (req,res)=>{
    const {_id} = req.params
    console.log("req.params",req.params);
    try{
    await db.del(colName,{_id:_id})
    res.send({code:200,info:'删除成功'})
    }catch(err){
        res.send({code:400,info:'删除失败'})
    }
})

// 获取个人信息
router.get("/:_id", async (req,res)=>{
    const {_id} = req.params
    // console.log("req.params",req.params);
    // 掩去密码
    const result = await db.query(colName,{_id})
    console.log("result",result);
    if(result){
        res.send({code:200,info:"查询成功",info:result})
    }else{
        res.send({code:400,info:"查询失败"})
    }
})