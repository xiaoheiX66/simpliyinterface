const express = require('express')
const mysql = require('mysql')
// const bodyParser = require('body-parser')
const pool = require('../db/normalSql')
const router = express.Router()
module.exports = router;

// const pool = mysql.createPool({
//     host:"localhost",
//     user:"Xn",
//     password:"123456",
//     database:"databasetest"
// })

// 单商品增加

router.post("/insert", async (req,res)=>{
    const { imgurl,covers,title,actors,sequel} = req.body
    let sql2 =`select * from eightyends where title like '%${title}%'`
    let sql = `insert into eightyends values(${null},'${imgurl}','${covers}','${title}','${actors}','${sequel}')`;
    // let sql2 = `select * from eightyends where id='${id+1}'`;
   let ret2 = await pool.query(sql2)
   console.log("插入结果",ret2);
   if(!ret2[0]){
    await pool.query(sql)
    res.send({code:200,msg:"添加成功"})
   }else{
       res.send({code:400,msg:"添加失败"})
   }
})

// 单商品更新
router.put("/update",async (req,res)=>{
    const {imgurl,covers,title,actors,sequel}= req.body;
    const { id } = req.query;
   
    let sql =`update eightyends set imgurl='${imgurl}',covers='${covers}',title='${title}',actors='${actors}',sequel='${sequel}' where id='${id}'`;
        let ret = await pool.query(sql)
        // console.log("扥新结果",ret.affectedRows);
        if(ret.affectedRows>0){
            res.send({code:200,msg:"更新成功"})
        }else{
            res.send({code:400,msg:"更新失败"})
        }
})
// 全商品搜索
router.get("/listAll", async (req,res)=>{
    let sql =`select * from eightyends`;
     let ret = await pool.query(sql)
     if(ret.length>0){
        res.send({code:200,msg:"查询成功",info:ret})
     }else{
         res.send({code:400,msg:"查询失败"})
     }
})
// 限量搜索
router.get("/list", async (req,res)=>{
    const {size=10,page=1} = req.query
    const skip =(page-1)*size
    const limit =Number(size)
    let sql = `select * from eightyends limit ${skip},${limit}`;
     let ret = await pool.query(sql)
     if(ret.length>0){
        res.send({code:200,msg:"查询成功",info:ret})
     }else{
         res.send({code:400,msg:"查询失败"})
     }
})
// 为了在前端能获取到最新的id值，纠正这个小bug
router.get("/getids",async (req,res)=>{
    let sql =`select max(id) from eightyends`
    let ret = await pool.query(sql)
    console.log("获取结果",ret);
    if(ret){
        res.send({code:200,msg:"获取成功",info:ret})
    }else{
        res.send({code:400,msg:"获取失败"})    
    }
})

// 单商品删除
router.delete("/:id", async (req,res)=>{
    const { id } = req.params;
    let sql = `delete from eightyends where id='${id}'`
    let ret = await pool.query(sql)
    if(!ret[0]){
        res.send({code:200,msg:"删除成功"})
    }else{
        res.send({code:400,msg:"删除失败"})
    }
    
})

// 单商品搜索
router.get("/:id", async (req,res)=>{
    const {id} = req.params;
    console.log("id",typeof(id),id);
    let sql = `select * from eightyends where id='${id}'`;
    console.log("sql",sql);
     let ret = await pool.query(sql)
    //  console.log("ret",ret);
     if(ret[0]){
        res.send({code:200,msg:"搜索成功",info:ret[0]})
     }else{
         res.send({code:400,msg:"搜索失败"})
     }
})


// 模糊搜索
router.post("/search",async (req,res)=>{
    const {values} = req.body;
    // console.log("req.params",values);
    let sql =`select * from eightyends where title like '%${values}%'`
    console.log("sql",sql);
    let ret = await pool.query(sql)
    console.log("搜索结果",ret);
     if(ret){
        res.send({code:200,msg:"搜索成功",info:ret})
     }else{
         res.send({code:400,msg:"搜索失败"})
     }
})
// 精确搜索,为相似产品提供内容
router.post("/cureSear",async (req,res)=>{
    const {values} = req.body;
    let sql = `select * from eightyends where covers=${values}`;
    let ret = await pool.query(sql)
    console.log("搜索结果",ret);
     if(ret){
        res.send({code:200,msg:"搜索成功",info:ret})
     }else{
         res.send({code:400,msg:"搜索失败"})
     }
})

