"use strict";

var express = require('express');

var path = require('path'); // const { createProxyMiddleware } = require('http-proxy-middleware')


var router = require('./router');

var app = express();
app.use(express["static"](path.join(__dirname, "../public")));
app.use("/api", router); // app.use("/api",createProxyMiddleware({
//     target:"http://gz.jumei.com/",
//     changeOrigin:true,
//     pathRewrite:{
//         "^/api":"/"
//     }
// }))

app.listen(8082, function () {
  console.log("8082 is listning...");
});