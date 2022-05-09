const express = require('express')
const router = express.Router();
module.exports = router;

const userRouter = require('./normalUser');
const goodsRouter = require('./normalGoods');
const mobileGoods = require('./normalMobilegoods')
const cartRouter = require('./cart')
const cors = require('../filteter/cor')
router.use(cors)
router.use(express.urlencoded({extended:true}),express.json())
// 后台
router.use("/user",userRouter)
router.use("/goods",goodsRouter);
router.use("/carts",cartRouter)
// 移动端
router.use("/goodser",mobileGoods)