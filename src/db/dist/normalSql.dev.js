"use strict";

var mysql = require('mysql');

var pool = mysql.createPool({
  host: "localhost",
  user: "Xn",
  password: "123456",
  database: "databasetest"
});
module.exports = {
  query: function query(sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
};