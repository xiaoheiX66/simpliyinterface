"use strict";

var express = require('express'); // const {createProxyMiddleware} = require('http-proxy-middleware')


var router = express.Router();
module.exports = router;

var userRouter = require('./user');

var goodsRouter = require('./goods');

var uploadRouter = require('./upload'); // 跨域封装引入


var cors = require('../filteter/cor');

router.use(cors); // 格式化请求体参数

router.use(express.urlencoded({
  extended: true
}), express.json(), express.text()); // const offerMiddleware = createProxyMiddleware({ 
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

router.use("/user", userRouter);
router.use("/goods", goodsRouter);
router.use('/upload', uploadRouter);