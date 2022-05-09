"use strict";

var express = require('express');

var mysql = require('mysql'); // const bodyParser = require('body-parser')


var pool = require('../db/normalSql');

var router = express.Router();
module.exports = router; // const pool = mysql.createPool({
//     host:"localhost",
//     user:"Xn",
//     password:"123456",
//     database:"databasetest"
// })
// 单商品增加

router.post("/insert", function _callee(req, res) {
  var _req$body, id, shopType, slpicImg, slName, newPrice, oldPrice, searchDeal, listButton, sql, sql2, ret2;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, shopType = _req$body.shopType, slpicImg = _req$body.slpicImg, slName = _req$body.slName, newPrice = _req$body.newPrice, oldPrice = _req$body.oldPrice, searchDeal = _req$body.searchDeal, listButton = _req$body.listButton;
          sql = "insert into spierdata values('".concat(id, "','").concat(shopType, "','").concat(slpicImg, "','").concat(slName, "','").concat(newPrice, "','").concat(oldPrice, "','").concat(searchDeal, "','").concat(listButton, "')");
          sql2 = "select * from spierdata where id='".concat(id, "'");
          _context.next = 5;
          return regeneratorRuntime.awrap(pool.query(sql2));

        case 5:
          ret2 = _context.sent;

          if (ret2[0]) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 9:
          res.send({
            code: 200,
            msg: "添加成功"
          });
          _context.next = 13;
          break;

        case 12:
          res.send({
            code: 400,
            msg: "添加失败"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 单商品更新

router.put("/update", function _callee2(req, res) {
  var _req$body2, shopType, slpicImg, slName, newPrice, oldPrice, searchDeal, listButton, id, sql, ret;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, shopType = _req$body2.shopType, slpicImg = _req$body2.slpicImg, slName = _req$body2.slName, newPrice = _req$body2.newPrice, oldPrice = _req$body2.oldPrice, searchDeal = _req$body2.searchDeal, listButton = _req$body2.listButton;
          id = req.query.id;
          sql = "update spierdata set shopType='".concat(shopType, "',slpicImg='").concat(slpicImg, "',newPrice='").concat(newPrice, "',slName='").concat(slName, "',oldPrice='").concat(oldPrice, "',searchDeal='").concat(searchDeal, "',listButton='").concat(listButton, "' where id='").concat(id, "'");
          _context2.next = 5;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 5:
          ret = _context2.sent;

          if (ret[0]) {
            res.send({
              code: 200,
              msg: "更新成功"
            });
          } else {
            res.send({
              code: 400,
              msg: "更新失败"
            });
          }

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 全商品搜索

router.get("/listAll", function _callee3(req, res) {
  var sql, ret;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sql = "select * from spierdata";
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 3:
          ret = _context3.sent;

          if (ret.length > 0) {
            res.send({
              code: 200,
              msg: "查询成功",
              info: ret
            });
          } else {
            res.send({
              code: 400,
              msg: "查询失败"
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 限量搜索

router.get("/list", function _callee4(req, res) {
  var _req$query, _req$query$size, size, _req$query$page, page, skip, limit, sql, ret;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$query = req.query, _req$query$size = _req$query.size, size = _req$query$size === void 0 ? 10 : _req$query$size, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page;
          skip = (page - 1) * size;
          limit = Number(size);
          sql = "select * from spierdata limit ".concat(skip, ",").concat(limit);
          _context4.next = 6;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 6:
          ret = _context4.sent;

          if (ret.length > 0) {
            res.send({
              code: 200,
              msg: "查询成功",
              info: ret
            });
          } else {
            res.send({
              code: 400,
              msg: "查询失败"
            });
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 单商品删除

router["delete"]("/:id", function _callee5(req, res) {
  var id, sql, ret;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          sql = "delete from spierdata where id='".concat(id, "'");
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 4:
          ret = _context5.sent;

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
          return _context5.stop();
      }
    }
  });
}); // 单商品搜索

router.get("/:id", function _callee6(req, res) {
  var id, sql, ret;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          sql = "select * from spierdata where id='".concat(id, "'");
          _context6.next = 4;
          return regeneratorRuntime.awrap(pool.query(sql));

        case 4:
          ret = _context6.sent;

          if (ret[0]) {
            res.send({
              code: 200,
              msg: "搜索成功",
              info: ret[0]
            });
          } else {
            res.send({
              code: 400,
              msg: "搜索失败"
            });
          }

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});