const express = require('express')
// const {createProxyMiddleware} = require('http-proxy-middleware')
const router = express.Router();
module.exports = router;

const userRouter = require('./user')
const goodsRouter = require('./goods')
const uploadRouter = require('./upload')
const orderManage = require('./orders')
// 跨域封装引入
const cors = require('../filteter/cor')
router.use(cors)

// 格式化请求体参数
router.use(express.urlencoded({extended:true}),express.json(),express.text())
// const offerMiddleware = createProxyMiddleware({ 
//     // 目标服务器
//     target: 'https://offer.qfh5.cn', 

//     // 修改请求源
//     changeOrigin: true,

//     // 路径重写
//     pathRewrite:{
//         '^/api/proxy':'/api',
//         '^/api/proxy/api':'/api'
//     }
// })
// /api/proxy
// router.use('/proxy',offerMiddleware)

router.use("/user",userRouter)
router.use("/goods",goodsRouter)
router.use('/upload',uploadRouter)
router.use('/orders',orderManage)