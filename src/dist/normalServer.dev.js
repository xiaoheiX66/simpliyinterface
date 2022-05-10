"use strict";

var express = require('express');

var path = require('path');

var router = require('./normalRouter');

var app = express();
app.use(express["static"](path.join(__dirname, "../public")));
app.use("/api", router);
var PORT = 8088;
app.listen(PORT, function () {
  console.log("".concat(PORT, " is listning..."));
});