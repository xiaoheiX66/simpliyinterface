const express = require('express')
const path = require('path')
const router = require('./normalRouter')

let app = express();

app.use(express.static(path.join(__dirname,"../public")))
app.use("/api",router)
app.use((req,res)=>{
    res.header("Access-Control-Allow-Origin:*");
    res.header("Access-Control-Allow-Headers:content-type");
    res.header("Access-Control-Request-Method:GET,POST");
})

const PORT = 8088;
app.listen(PORT,()=>{
    console.log(`${PORT} is listning...`);
})