"use strict";

var express = require('express');

var router = express.Router();
module.exports = router;

var userRouter = require('./normalUser');

var goodsRouter = require('./normalGoods');

var cartRouter = require('./cart');

router.use(express.urlencoded({
  extended: true
}), express.json());
router.use("/user", userRouter);
router.use("/goods", goodsRouter);
router.use("/carts", cartRouter);