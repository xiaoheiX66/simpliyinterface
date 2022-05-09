"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ObjectId = _require.ObjectId;

var url = 'mongodb://localhost:27017';
var dbName = 'MushRoom';
/**
 * 连接Mongodb
 */

function connect() {
  var client, db;
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          client = new MongoClient(url); // 连接mongo

          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          // 使用数据库: use h52110
          // 必须连接成功后才可使用
          db = client.db(dbName);
          return _context.abrupt("return", {
            db: db,
            client: client
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}
/**
 * 添加
 * @param {String} colName 集合名称
 * @param {Object|Array} data 待插入的数据
 * @return {Boolean}    数据写入是否成功
 */


function insert(colName, data) {
  var _ref, db, client, col, result;

  return regeneratorRuntime.async(function insert$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref = _context2.sent;
          db = _ref.db;
          client = _ref.client;
          // 选择集合
          col = db.collection(colName);
          _context2.prev = 6;

          if (!Array.isArray(data)) {
            _context2.next = 13;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(col.insertMany(data));

        case 10:
          result = _context2.sent;
          _context2.next = 16;
          break;

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(col.insertOne(data));

        case 15:
          result = _context2.sent;

        case 16:
          result = true;
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](6);
          result = false;

        case 22:
          // 关闭客户端连接，释放资源占用
          client.close();
          return _context2.abrupt("return", result);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[6, 19]]);
} // insert('user',{username:'xxx',password:123})
// insert('goods',[{username:'xxx',password:123},{username:'xxx',password:123}])

/**
 * 删除
 * @param {String} colName 集合名称
 * @param {Object} filter  查询条件
 * @returns {Boolean}   删除是否成功
 */


function del(colName, filter) {
  var _ref2, db, client, col, ids, result;

  return regeneratorRuntime.async(function del$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref2 = _context3.sent;
          db = _ref2.db;
          client = _ref2.client;
          col = db.collection(colName); // 转换id为ObjectId

          if (typeof filter._id === 'string') {
            filter._id = ObjectId(filter._id);
          } else if (Array.isArray(filter._id)) {
            ids = filter._id.map(function (item) {
              return ObjectId(item);
            });
          }

          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(col.deleteMany(filter));

        case 10:
          result = _context3.sent;
          result = result.deletedCount > 0;
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          result = false;

        case 17:
          client.close();
          return _context3.abrupt("return", result);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
} // del('goods',{_id})

/**
 * 
 * @param {String} colName 集合名称
 * @param {Object} filter 查询条件
 * @param {Object} data 更新的数据（包含操作符的对象）
 */


function update(colName, filter, data) {
  var _ref3, db, client, col, result;

  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref3 = _context4.sent;
          db = _ref3.db;
          client = _ref3.client;
          col = db.collection(colName);

          if (typeof filter._id === 'string') {
            filter._id = ObjectId(filter._id);
          }

          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(col.updateMany(filter, data));

        case 10:
          result = true;
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](7);
          result = false;

        case 16:
          client.close();
          return _context4.abrupt("return", result);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 13]]);
}
/**
 * 查询
 * @param {String} colName 集合名称
 * @param {Object} filter 查询条件
 * @param {Object} options 其他选项
 * @returns {Array} 查询结果
 */


function query(colName) {
  var filter,
      options,
      _ref4,
      db,
      client,
      col,
      cursor,
      _key,
      _type,
      result,
      _args5 = arguments;

  return regeneratorRuntime.async(function query$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          filter = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          _context5.next = 4;
          return regeneratorRuntime.awrap(connect());

        case 4:
          _ref4 = _context5.sent;
          db = _ref4.db;
          client = _ref4.client;
          col = db.collection(colName);

          if (typeof filter._id === 'string') {
            filter._id = ObjectId(filter._id);
          }

          cursor = col.find(filter, {
            projection: options.projection
          }); // 跳过数量

          if (options.skip) {
            cursor = cursor.skip(options.skip);
          }

          if (options.limit) {
            cursor.limit(options.limit);
          }

          if (options.sort) {
            if (Array.isArray(sort)) {
              _key = sort[0];
              _type = sort[1];
            } else {
              key = sort;
              type = 1;
            }

            cursor.sort(_defineProperty({}, key, type));
          }

          _context5.next = 15;
          return regeneratorRuntime.awrap(cursor.toArray());

        case 15:
          result = _context5.sent;
          client.close();
          return _context5.abrupt("return", result);

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  });
}
/**
 * 默认排序(从小到大)
 * @param {String} colName 
 * @param {Object} filter 
 * @param {*} data 排序后的数据
 * 通过find(相同类型).sort(排序条件)
 */
// async function orderBy(colName,filter={},data){
//     const { db, client } = await connect()
//     const col = db.collection(colName)
//     if (typeof filter._id === 'string') {
//         filter._id = ObjectId(filter._id)
//     }
//     // 转换成数字排序
//     if( typeof filter.goods_price == 'string'){
//         filter.goods_price = Number(filter.goods_price)
//     }
//     let result;
//     try{
//         await col.find(filter).sort()
//         result = true;
//     }catch(err){
//         result = false;
//     }
//     client.close()
//     return result;
// }


module.exports = {
  insert: insert,
  del: del,
  update: update,
  query: query
};