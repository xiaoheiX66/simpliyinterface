const express = require('express')
const router = express.Router()
module.exports = router;

const db = require('../db')
const colName = 'orderinfos'
const shopName = 'goods'
const { formParams } = require('../utils')

// 订单管理

// 列表
router.get("/lists",async (req,res)=>{
    const {page=1,size=15,sort} = req.query;
    const skip = (page-1)*size;
    const limit =Number(size);
    const result = await db.query(colName,{},{
        skip,limit,sort
    })
    console.log("resludjaosoakot",result);
    let shids=[];
    let shopCont=[];
    if(result){
       result.forEach(async(item)=>{
               let ret = await db.query(shopName,{_id:`${item.shopsid}`}) 
                shopCont.push(ret[0])
        })
        res.send({code:200,userinfos:result,info:"查询成功",total:30})
        console.log("result",result);
    }
     console.log("循环查出的内容",shopCont);
   
})
// 添加
router.post("/adds",async(req,res)=>{
    const {firstname,password,shopsid} = req.body
    const result = await db.insert(colName,{firstname,password,shopsid})
    if(result){
        const resData = await db.query(colName,{firstname}) 
        const shopsinfo = await db.query("goods",{_id:shopsid})
        res.send({code:200,info:'添加成功',users:resData,shopinfos:shopsinfo})
    }else{
        res.send({code:400,info:'添加失败'})
    }
})
// 删除
router.delete("/:id", async (req,res)=>{
    const { id } = req.params
    const result = await db.del(colName,{_id:id})
    if(result){
        res.send({code:200,info:'删除成功'})
    }else{
        res.send({code:400,info:'删除失败'})
    }
})

// 更新
router.put("/:id", async (req,res)=>{
    const { id } = req.params
    const { firstname,password,shopsid,shopsnum } = req.body
    const newData =formParams(req.body,["firstname","password","shopsid","shopsnum"])
    if(firstname){
        newData.firstname = firstname
    }
    if(password){
        newData.password = password
    }
    if(shopsid){
        newData.shopsid = shopsid 
    }
    if(shopsnum){
        newData.shopsnum = shopsnum
    }
   
    try{
        await db.update(colName,{_id:id},{$set:newData})
        res.send({code:200,msg:'更新成功'})
    }catch(err){
        res.send({code:400,msg:'更新失败'})
    }
})