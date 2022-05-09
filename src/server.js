const express = require('express')
const path = require('path')
// const { createProxyMiddleware } = require('http-proxy-middleware')
const router = require('./router')

const app = express()

app.use(express.static(path.join(__dirname,"../public")))
app.use("/api",router)
app.use((req,res)=>{
    res.header("Access-Control-Allow-Origin:*");
    res.header("Access-Control-Allow-Headers:content-type");
    res.header("Access-Control-Request-Method:GET,POST");
})
// app.use("/api",createProxyMiddleware({
//     target:"http://gz.jumei.com/",
//     changeOrigin:true,
//     pathRewrite:{
//         "^/api":"/"
//     }
// }))

app.listen(8082,()=>{
    console.log("8082 's is running...");
})
