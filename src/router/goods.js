const express = require('express')
const router = express.Router()
module.exports = router;

const db = require('../db')
const colName = 'goods'
const { formParams } = require('../utils')

// 获取商品信息，多为多个
router.get("/list", async (req,res)=>{
    const {page=1,size=15,sort} = req.query;
    const skip = (page-1)*size;
    const limit =Number(size);
    const result = await db.query(colName,{},{
        skip,limit,sort
    })
    if(result){
        res.send({code:200,msg:result,info:"查询成功",total:180})
    }else{
        res.send({code:400,msg:'查询失败'})
    }
})
// 按照类型搜索
// 增
router.post("/insert", async (req,res)=>{
    const { tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price} = req.body
   
    console.log("insertbody",req.body);
    const result = await db.insert(colName,{tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price})
    //  const {_id} = req.query;
    if(result){
        const resData = await db.query(colName,{tradeItemId}) 
        res.send({code:200,info:'添加成功',msg:resData})
    }else{
        res.send({code:400,info:'添加失败'})
    }
})
// 商品更新,第二日再测试
router.put("/updgoods", async(req,res)=>{
    const {tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price} = req.body
    sale = sale.trim()*1
    cfav = cfav.trim()*1
    price = price.trim()*1
    hasSimilarity = Boolean(hasSimilarity)
    console.log("修改过后的内容",typeof(sale),typeof(cfav));
    const {_id} = req.query
    const result = await db.query(colName,{_id}) 
        if(result){
            const resData = await db.put(colName,{tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price}) 
            res.send({code:200,info:'更新成功',msg:resData})
        }else{
            res.send({code:400,info:'更新失败'})
        }
})
//批量删除
router.delete("/list", async(req,res)=>{
    const { idx } = req.body
    try{
        await db.del(colName,{_id:idx})
        res.send({code:200,msg:'删除成功'})
    }catch(err){
        res.send({code:400,msg:'删除失败'})
    }
})
// 删
router.delete("/:id", async (req,res)=>{
    const { id } = req.params
    const result = await db.del(colName,{_id:id})
    if(result){
        res.send({code:200,info:'删除成功'})
    }else{
        res.send({code:400,info:'删除失败'})
    }
})


// 改
router.put("/:id", async (req,res)=>{
    const { id } = req.params
    const { title,hasSimilarity,sale,price } = req.body
    const newData =formParams(req.body,["title","hasSimilarity","sale","price"])
    if(title){
        newData.title = title
    }
    if(hasSimilarity){
        newData.hasSimilarity = hasSimilarity
    }
    if(sale){
        newData.sale = sale 
    }
    if(price){
        newData.price = price 
    }
    try{
        await db.update(colName,{_id:id},{$set:newData})
        res.send({code:200,msg:'更新成功'})
    }catch(err){
        res.send({code:400,msg:'更新失败'})
    }
})
// 排序

// 获取商品信息
router.get("/:_id", async (req,res)=>{
    const {_id} = req.params
    const result = await db.query(colName,{_id})
    if(result){
        res.send({code:200,msg:result,info:"查询成功"})
    }else{
        res.send({code:400,msg:'查询失败'})
    }
})
// 模糊查询
router.get("/searchs",async (req,res)=>{
    const {values} = req.params;
    // console.log("要查询的内容",values);
    const result = await db.vgquery(colName,values)
    if(result){
        res.send({code:200,msg:result,info:"查询成功"})
    }else{
        res.send({code:400,msg:'查询失败'})
    }
})
// 下架
router.patch('/patchs/:id', async (req,res)=>{
    const {id} = req.params
    const {hasSimilarity} = req.body
    const newData =formParams(req.body,["hasSimilarity"])
    if(hasSimilarity){
        newData.hasSimilarity = hasSimilarity
    }
    try{
        await db.update(colName,{_id:id},{$set:newData})
        const afterData = await db.query(colName,{_id:id})
        res.send({code:200,msg:'更新成功',info:afterData})
    }catch(err){
        res.send({code:400,msg:'更新失败'})
    }
})
