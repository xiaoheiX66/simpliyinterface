"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var url = 'mongodb://localhost:27017';
var dbName = 'drinkRegList';

function connect() {
  var client, db;
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          client = new MongoClient(url);
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
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
 * 
 * @param {String} colName 
 * @param {Object|Array} data 
 * @returns 
 */


function insert(colName, data) {
  var db, col, result;
  return regeneratorRuntime.async(function insert$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          db = _context2.sent;
          col = db.collection(colName);
          _context2.prev = 4;

          if (!Array.isArray(col)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(col.insertMany(data));

        case 8:
          _context2.next = 12;
          break;

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(col.insertOne(data));

        case 12:
          result = true;
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](4);
          result = false;

        case 18:
          client.close();
          return _context2.abrupt("return", result);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 15]]);
}

function del(colName, query) {
  var db, col, result;
  return regeneratorRuntime.async(function del$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          db = _context3.sent;
          col = db.collection(colName);

          try {
            col.deleteMany(filter);
            result = true;
          } catch (err) {
            result = false;
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function modifile() {}

function search() {}