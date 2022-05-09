const {Router} = require('express')
const {ObjectId, Db} = require('mongodb')
const router = Router()
module.exports = router;

const {formData,formParams} = require('../utils')
const pool = require('../db/normalSql')


// 添加购物车、数量加1验证
router.post("/addshops",async (req,res)=>{
    // 获取需要添加的字段
    // const { id,shopname } = req.body;
    // 后期可根据需要的字段进行添加
    const { id,tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price} = req.body
    let sql =`select * from cartlist2 where _id='${id}' and title='${title}'`;
    // 判断添加的字段是否在数据表中
    const data =await pool.query(sql)
    console.log("datasearch",data);
    if(data.length>0){
        // 获取当前数量值,并加1
        const num = data[0].qty*1+1*1;
        // 发起更新请求
        let newsql =`update cartlist2 set qty='${num}' where _id='${id}'`;
        const ret = await pool.query(newsql)
        if(!ret[0]){
            res.send({code:200,msg:"更新成功",info:data})
        }else{
            res.send({code:400,msg:"更新失败"})
        }
    }else{
        // const { id,shopname,shopimg,shopprice,shopsnum} = req.body
        // shopsnum=1;
        let sql =`insert into cartlist2(_id,tradeItemId,itemType,img,title,hasSimilarity,sale,cfav,price,qty) values('${id}','${tradeItemId}','${itemType}','${img}','${title}','${hasSimilarity}','${sale}','${cfav}','${price}','1')`;
        const result = await pool.query(sql)
        if(!result[0]){
            res.send({code:200,msg:"添加成功",info:result[0]})
        }else{
            res.send({code:400,msg:"添加失败"})
        }
    }
})
// 获取购物车全部数据
router.get("/getlists",async (req,res)=>{
    let sql =`select * from cartlist2`
    const ret = await pool.query(sql)
    console.log("购物车数据",ret);
    if(ret){
        res.send({code:200,msg:"查询成功",info:ret})
    }else{
        res.send({code:400,msg:"查询失败"})
    }
})
// 通过id值获取购物车数据
router.get("/getshops",async (req,res)=>{
    const { id } = req.query
    let sql =`select *from cartlist2 where _id='${id}'`;
    const ret = await pool.query(sql)
    if(ret[0]){
        res.send({code:200,msg:"查询成功",info:ret[0]})
    }else{
        res.send({code:400,msg:"查询失败"})
    }
})
// 修改购物车数据

// 删除购物车单商品
router.delete("/deltes/:id",async (req,res)=>{
    const {id} = req.params;
    let sql=`delete from cartlist2 where _id='${id}'`
    const ret = await pool.query(sql)
    console.log("购物车删除测验",ret.affectedRows);
    if(!!ret.affectedRows){
        res.send({code:200,msg:"删除成功"})
    }else{
        res.send({code:400,msg:"删除失败"})
    }
})
// 多选删除

// 结算(删除选中)

// 清空购物车

// 便捷化，购物车数量+1【内容qty发送的数量比数据库qty少1】
router.post("/addcs",async (req,res)=>{
    const {id} = req.body;
    let sql = `select * from cartlist2 where _id ='${id}'`;
    const ret = await pool.query(sql)
    // console.log("ret",ret);
    if(ret[0]){
       let qty = ret[0].qty+1
       let sql2 = `update cartlist2 set qty='${qty}' where _id='${id}'`;
       console.log("qty",qty);
      await pool.query(sql2);
      res.send({code:200,msg:"查询成功",infos:ret})
      return    
    }else{
        res.send({code:200,msg:"查询失败"})
    }
})
// 便捷化，购物车数量-1【内容qty发送的数量比数据qty多1】
router.post("/redecs",async (req,res)=>{
    const {id} = req.body;
    let sql = `select * from cartlist2 where _id ='${id}'`;
    const ret = await pool.query(sql)
    // console.log("ret",ret);
    if(ret[0]){
        res.send({code:200,msg:"查询成功",infos:ret})
        let qty = ret[0].qty-1
       if(qty<=0){
        console.log("qty",qty);
        return
       }else{
        let sql2 = `update cartlist2 set qty='${qty}' where _id='${id}'`;
         await pool.query(sql2);
       }
      return    
    }else{
        res.send({code:200,msg:"查询失败"})
    }
})
// 批量删除【初步简单批量删除，后期搜寻总量判断是否超出，并给予提示】
// 通过判断数据库条数，判断传过来的数据条数在可行范围内
// 初期先限制10条送入数据，后期进行接口完善
router.delete("/delmore",async (req,res)=>{
    let {id1,id2} = req.body;
    console.log("id1"+id1,"id2"+id2);
    // const {} = req.body;
    // let idx = req.body;
     console.log("body-length",req.body);
    // for(let k in req.body){
    //     console.log("kk",req.body[k].length);
    // }
    // let sql = `select count(*) from cartlist2`;
    // let ret = await pool.query(sql);
    // for(let val in ret){
    // }
    let sql2 =`delete from cartlist2 where _id in ('${id1}','${id2}')`;
    // let sql2 = `delete from cartlist2 where _id in '${idx}'`;
    let ret2 = await pool.query(sql2);
    console.log("购物车删除测验",ret2);
   
    if(ret2.affectedRows>0){
        res.send({code:200,msg:"删除成功"})
        return
    }else{
        res.send({code:400,msg:"删除失败"})
    }
})