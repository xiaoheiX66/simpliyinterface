"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express'); // const mysql = require('mysql')


var router = express.Router();
module.exports = router;

var db = require('../db');

var colName = 'users';

var _require = require('../utils'),
    formParams = _require.formParams,
    token = _require.token; // 登录
// router.get("/login", async (req,res)=>{
//     const {username,password} = req.query
//     const result =  await db.query(colName,{username,password},{projection:{password:0}})
//     if(result.length>0){
//         res.send({code:200,msg:result})
//     }else{
//         res.send({code:400,msg:"用户名或密码错误"})
//     }
// })
// 免密7天登录


router.post("/login", function _callee(req, res) {
  var _req$body, username, password, mdl, result, Authorization;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, mdl = _req$body.mdl;
          console.log("req.query", req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(db.query(colName, {
            username: username,
            password: password
          }, {
            projection: {
              password: 0
            }
          }));

        case 4:
          result = _context.sent;

          if (result.length > 0) {
            // 判断是否选择7天免登录
            if (mdl === 'true') {
              // 生成有效期为7天的token
              Authorization = token.create({
                username: username
              }, '7d');
            } else {
              Authorization = token.create({
                username: username
              });
            } // 后端设置cookie
            // res.set({
            //     'Set-Cookie':`Authorization=${Authorization}`
            // })


            result[0].Authorization = Authorization;
            res.send({
              code: 200,
              msg: "登陆成功",
              info: result
            });
          } else {
            res.send({
              code: 400,
              msg: "用户名或密码错误"
            });
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 注册

router.post("/reg", function _callee2(req, res) {
  var _req$body2, username, password, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          console.log("账户密码req.body", req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(db.insert(colName, {
            username: username,
            password: password
          }));

        case 4:
          result = _context2.sent;
          console.log("result", result);

          if (result) {
            res.send({
              code: 200,
              msg: "注册成功"
            });
          } else {
            res.send({
              code: 400,
              msg: "注册失败"
            });
          }

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 添加成员

router.post("/addUser", function _callee3(req, res) {
  var _req$body3, username, password, result, userres;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password; // console.log("账户密码req.body",req.body);

          _context3.next = 3;
          return regeneratorRuntime.awrap(db.insert(colName, {
            username: username,
            password: password
          }));

        case 3:
          result = _context3.sent;

          if (!result) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(db.query(colName, {
            username: username
          }));

        case 7:
          userres = _context3.sent;
          res.send({
            code: 200,
            msg: "添加成功",
            info: userres
          });
          _context3.next = 12;
          break;

        case 11:
          res.send({
            code: 400,
            msg: "添加失败"
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 校验token

router.get("/verify", function _callee4(req, res) {
  var Authorization, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          Authorization = req.get('Authorization'); // const {username} = req.query;
          // const userinfos = await db.query(colName,{username})
          // console.log("usernmae"+username,"userinfos",userinfos);

          console.log("Authorization", Authorization);
          _context4.next = 4;
          return regeneratorRuntime.awrap(token.verify(Authorization));

        case 4:
          result = _context4.sent;

          if (result) {
            res.send({
              code: 200,
              msg: "登录成功",
              info: result
            });
          } else {
            res.send({
              code: 400,
              msg: "登录失败",
              info: result
            });
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 获取人群信息

router.get("/moreList", function _callee5(req, res) {
  var _req$query, _req$query$page, page, _req$query$size, size, skip, limit, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$size = _req$query.size, size = _req$query$size === void 0 ? 5 : _req$query$size;
          console.log("获取人群信息相关内容", req.query); // 计算跳过的数量与限制数量

          skip = (page - 1) * size;
          limit = Number(size);
          _context5.next = 6;
          return regeneratorRuntime.awrap(db.query(colName, {}, {
            skip: skip,
            limit: limit,
            projection: {
              password: 0
            }
          }));

        case 6:
          result = _context5.sent;

          if (result) {
            res.send({
              code: 200,
              msg: result
            });
          } else {
            res.send({
              code: 400,
              msg: "查询失败"
            });
          }

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // 更新单人信息

router.put("/:id", function _callee6(req, res) {
  var id, _req$body4, username, password, newData;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id; // console.log("req.params",req.params);

          _req$body4 = req.body, username = _req$body4.username, password = _req$body4.password;
          newData = formParams(req.body, ["username", "password"]);

          if (username) {
            newData.username = username;
          }

          if (password) {
            newData.password = password;
          }

          _context6.prev = 5;
          _context6.next = 8;
          return regeneratorRuntime.awrap(db.update(colName, {
            _id: id
          }, {
            $set: newData
          }));

        case 8:
          res.send({
            code: 200,
            info: '更新成功',
            msg: newData
          });
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](5);
          res.send({
            code: 400,
            info: '更新失败'
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 11]]);
}); // 删除单人信息

router["delete"]("/:_id", function _callee7(req, res) {
  var _id;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _id = req.params._id;
          console.log("req.params", req.params);
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(db.del(colName, {
            _id: _id
          }));

        case 5:
          res.send({
            code: 200,
            info: '删除成功'
          });
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](2);
          res.send({
            code: 400,
            info: '删除失败'
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); // 获取个人信息

router.get("/:_id", function _callee8(req, res) {
  var _id, result;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _id = req.params._id; // console.log("req.params",req.params);
          // 掩去密码

          _context8.next = 3;
          return regeneratorRuntime.awrap(db.query(colName, {
            _id: _id
          }));

        case 3:
          result = _context8.sent;
          console.log("result", result);

          if (result) {
            res.send(_defineProperty({
              code: 200,
              info: "查询成功"
            }, "info", result));
          } else {
            res.send({
              code: 400,
              info: "查询失败"
            });
          }

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
});