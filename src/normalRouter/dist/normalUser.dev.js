"use strict";

var express = require('express');

var mysql = require('mysql');

var db = require('../db/normalSql');

var bodyParser = require('body-parser');

var _require = require('../utils'),
    token = _require.token;

var router = express.Router();
module.exports = router; // const pool = mysql.createPool({
//     host:"localhost",
//     user:"Xn",
//     password:"123456",
//     database:"databasetest"
// })
// 成员登录

router.get("/login", function _callee(req, res) {
  var _req$query, username, password, mdl, sql, ret, authorization;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, username = _req$query.username, password = _req$query.password, mdl = _req$query.mdl; //    console.log("reqlogin",req.query);

          sql = "select * from user where username='".concat(username, "' and password='").concat(password, "'");
          _context.next = 4;
          return regeneratorRuntime.awrap(db.query(sql));

        case 4:
          ret = _context.sent;

          if (ret.length > 0) {
            // 设置7天免登录
            if (mdl === 'true') {
              authorization = token.create({
                username: username
              }, '7d');
            } else {
              authorization = token.create({
                username: username
              });
            }

            ret[0].authorization = authorization;
            res.send({
              code: 200,
              msg: "登陆成功",
              info: ret[0]
            });
          } else {
            res.send({
              code: 400,
              msg: "登陆失败"
            });
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 成员注册
// let bodyParser2 = bodyParser.urlencoded({extended:true})

router.post("/reg", function _callee2(req, res) {
  var _req$body, username, password, sql, ret;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          console.log("注册", req.body);
          sql = "insert into user values(".concat(null, ",'", username, "','").concat(password, "')");
          _context2.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM user WHERE username='".concat(username, "'")));

        case 5:
          ret = _context2.sent;

          if (ret[0]) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(db.query(sql));

        case 9:
          res.send({
            code: 200,
            msg: "注册成功"
          });
          return _context2.abrupt("return");

        case 11:
          res.send({
            code: 400,
            msg: "用户名已存在，请重新注册"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 成员列表查询

router.get("/list", function _callee3(req, res) {
  var sql, ret;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sql = "select * from user";
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.query(sql));

        case 3:
          ret = _context3.sent;

          if (ret.length > 0) {
            res.send({
              code: 200,
              msg: "搜索成功",
              info: ret
            });
          } else {
            res.send({
              code: 400,
              msg: "搜索失败"
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 成员个体查询

router.get("/:id", function _callee4(req, res) {
  var id, sql, ret;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          sql = "select * from user where id='".concat(id, "'");
          _context4.next = 4;
          return regeneratorRuntime.awrap(db.query(sql));

        case 4:
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

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 成员个体删除

router["delete"]("/del/:id", function _callee5(req, res) {
  var id, sql, ret;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          console.log("delid", req.params);
          sql = "delete from user where id='".concat(id, "'");
          _context5.next = 5;
          return regeneratorRuntime.awrap(db.query(sql));

        case 5:
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

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});