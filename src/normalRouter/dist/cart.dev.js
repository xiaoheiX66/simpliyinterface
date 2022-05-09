"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('mongodb'),
    ObjectId = _require2.ObjectId;

var router = Router();
module.exports = router;

var _require3 = require('../utils'),
    formData = _require3.formData,
    formParams = _require3.formParams;

var pool = require('../db/normalSql'); // 添加购物车


router.post("/addshops", function _callee(req, res) {
  var _req$body, id, shopname, shopimg, shopprice, shopsnum, sql, data, num, newsql, ret, _sql, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 获取需要添加的字段
          // const { id,shopname } = req.body;
          // 后期可根据需要的字段进行添加
          _req$body = req.body, id = _req$body.id, shopname = _req$body.shopname, shopimg = _req$body.shopimg, shopprice = _req$body.shopprice, shopsnum = _req$body.shopsnum;
          sql = "select * from cartpage where id='".concat(id, "' and shopname='").concat(shopname, "'"); // 判断添加的字段是否在数据表中

          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 4:
          data = _context.sent;
          console.log("datasearch", data);

          if (!(data.length > 0)) {
            _context.next = 15;
            break;
          }

          // 获取当前数量值,并加1
          num = data[0].shopsnum * 1 + 1 * 1; // 发起更新请求

          newsql = "update cartpage set shopsnum='".concat(num, "' where id='").concat(id, "'");
          _context.next = 11;
          return regeneratorRuntime.awrap(pool.query(newsql));

        case 11:
          ret = _context.sent;

          if (!ret[0]) {
            res.send({
              code: 200,
              msg: "更新成功",
              info: data
            });
          } else {
            res.send({
              code: 400,
              msg: "更新失败"
            });
          }

          _context.next = 20;
          break;

        case 15:
          // const { id,shopname,shopimg,shopprice,shopsnum} = req.body
          // shopsnum=1;
          _sql = "insert into cartpage(id,shopname,shopimg,shopprice,shopsnum) values('".concat(id, "','").concat(shopname, "','").concat(shopimg, "','").concat(shopprice, "','").concat(shopsnum, "')");
          _context.next = 18;
          return regeneratorRuntime.awrap(pool.query(_sql));

        case 18:
          result = _context.sent;

          if (!result[0]) {
            res.send({
              code: 200,
              msg: "添加成功",
              info: result[0]
            });
          } else {
            res.send({
              code: 400,
              msg: "添加失败"
            });
          }

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 获取购物车数据

router.get("/getshops", function _callee2(req, res) {
  var shopname, sql, ret;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          shopname = req.query.shopname;
          sql = "select *from cartpage where shopname='".concat(shopname, "'");
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 4:
          ret = _context2.sent;

          if (ret[0]) {
            res.send({
              code: 200,
              msg: "查询成功",
              info: ret[0]
            });
          } else {
            res.send({
              code: 400,
              msg: "查询失败"
            });
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 修改购物车数据
// 修改数量
// 删除购物车商品
// 结算(删除选中)
// 清空购物车

router["delete"]("/clearbus", function _callee3(req, res) {
  var shopname, sql, ret;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          shopname = req.body.shopname;
          sql = "delete from cartpage where shopname='".concat(shopname, "'");
          _context3.next = 4;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 4:
          ret = _context3.sent;

          if (!ret[0]) {
            res.send({
              code: 200,
              msg: "删除成功"
            });
          } else {
            res.send({
              code: 400,
              msg: "删除失败"
            });
          }

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});