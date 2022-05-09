"use strict";

var express = require('express');

var router = express.Router();
module.exports = router;

var db = require('../db');

var colName = 'goods';

var _require = require('../utils'),
    formParams = _require.formParams; // 获取商品信息，多为多个


router.get("/list", function _callee(req, res) {
  var _req$query, _req$query$page, page, _req$query$size, size, sort, skip, limit, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$size = _req$query.size, size = _req$query$size === void 0 ? 15 : _req$query$size, sort = _req$query.sort;
          skip = (page - 1) * size;
          limit = Number(size);
          _context.next = 5;
          return regeneratorRuntime.awrap(db.query(colName, {}, {
            skip: skip,
            limit: limit,
            sort: sort
          }));

        case 5:
          result = _context.sent;

          if (result) {
            res.send({
              code: 200,
              msg: result,
              info: "查询成功",
              total: 180
            });
          } else {
            res.send({
              code: 400,
              msg: '查询失败'
            });
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 按照类型搜索
// 增

router.post("/insert", function _callee2(req, res) {
  var _req$body, tradeItemId, itemType, img, title, hasSimilarity, sale, cfav, price, result, resData;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, tradeItemId = _req$body.tradeItemId, itemType = _req$body.itemType, img = _req$body.img, title = _req$body.title, hasSimilarity = _req$body.hasSimilarity, sale = _req$body.sale, cfav = _req$body.cfav, price = _req$body.price;
          console.log("insertbody", req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(db.insert(colName, {
            tradeItemId: tradeItemId,
            itemType: itemType,
            img: img,
            title: title,
            hasSimilarity: hasSimilarity,
            sale: sale,
            cfav: cfav,
            price: price
          }));

        case 4:
          result = _context2.sent;

          if (!result) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(db.query(colName, {
            tradeItemId: tradeItemId
          }));

        case 8:
          resData = _context2.sent;
          res.send({
            code: 200,
            info: '添加成功',
            msg: resData
          });
          _context2.next = 13;
          break;

        case 12:
          res.send({
            code: 400,
            info: '添加失败'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 商品更新,第二日再测试

router.put("/updgoods", function _callee3(req, res) {
  var _req$body2, tradeItemId, itemType, img, title, hasSimilarity, sale, cfav, price, _id, result, resData;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, tradeItemId = _req$body2.tradeItemId, itemType = _req$body2.itemType, img = _req$body2.img, title = _req$body2.title, hasSimilarity = _req$body2.hasSimilarity, sale = _req$body2.sale, cfav = _req$body2.cfav, price = _req$body2.price;
          _id = req.query._id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(db.query(colName, {
            _id: _id
          }));

        case 4:
          result = _context3.sent;

          if (!result) {
            _context3.next = 12;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(db.put(colName, {
            tradeItemId: tradeItemId,
            itemType: itemType,
            img: img,
            title: title,
            hasSimilarity: hasSimilarity,
            sale: sale,
            cfav: cfav,
            price: price
          }));

        case 8:
          resData = _context3.sent;
          res.send({
            code: 200,
            info: '更新成功',
            msg: resData
          });
          _context3.next = 13;
          break;

        case 12:
          res.send({
            code: 400,
            info: '更新失败'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //批量删除

router["delete"]("/list", function _callee4(req, res) {
  var idx;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          idx = req.body.idx;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(db.del(colName, {
            _id: idx
          }));

        case 4:
          res.send({
            code: 200,
            msg: '删除成功'
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          res.send({
            code: 400,
            msg: '删除失败'
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); // 删

router["delete"]("/:id", function _callee5(req, res) {
  var id, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.del(colName, {
            _id: id
          }));

        case 3:
          result = _context5.sent;

          if (result) {
            res.send({
              code: 200,
              info: '删除成功'
            });
          } else {
            res.send({
              code: 400,
              info: '删除失败'
            });
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // 改

router.put("/:id", function _callee6(req, res) {
  var id, _req$body3, title, hasSimilarity, sale, price, newData;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _req$body3 = req.body, title = _req$body3.title, hasSimilarity = _req$body3.hasSimilarity, sale = _req$body3.sale, price = _req$body3.price;
          newData = formParams(req.body, ["title", "hasSimilarity", "sale", "price"]);

          if (title) {
            newData.title = title;
          }

          if (hasSimilarity) {
            newData.hasSimilarity = hasSimilarity;
          }

          if (sale) {
            newData.sale = sale;
          }

          if (price) {
            newData.price = price;
          }

          _context6.prev = 7;
          _context6.next = 10;
          return regeneratorRuntime.awrap(db.update(colName, {
            _id: id
          }, {
            $set: newData
          }));

        case 10:
          res.send({
            code: 200,
            msg: '更新成功'
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](7);
          res.send({
            code: 400,
            msg: '更新失败'
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[7, 13]]);
}); // 排序
// 获取商品信息

router.get("/:_id", function _callee7(req, res) {
  var _id, result;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _id = req.params._id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.query(colName, {
            _id: _id
          }));

        case 3:
          result = _context7.sent;

          if (result) {
            res.send({
              code: 200,
              msg: result,
              info: "查询成功"
            });
          } else {
            res.send({
              code: 400,
              msg: '查询失败'
            });
          }

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
});