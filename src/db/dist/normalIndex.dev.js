"use strict";

var express = require('express');

var path = require('path');

var mysql = require('mysql');

var app = express();
var pool = mysql.createPool({
  host: "localhost",
  user: "Xn",
  password: "123456",
  database: "databasetest"
});
app.use(express["static"](path.join(__dirname, "../public"))); // 用户

app.get("/login", function (res, req) {
  var _req$query = req.query,
      username = _req$query.username,
      password = _req$query.password;
  pool.query("select * from user where username=".concat(username, " and password=").concat(password), function (err, data) {
    if (err) {
      res.send({
        code: 400,
        msg: "登陆失败"
      });
    } else {
      res.send({
        code: 200,
        msg: "登陆成功",
        info: data
      });
    }
  });
}); // 商品

var PORT = 8083;
app.listen(PORT, function () {
  console.log("".concat(PORT, " is listning..."));
});