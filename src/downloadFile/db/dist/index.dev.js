"use strict";

var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'Xn',
  password: '123456',
  //port: 3306,
  database: 'databasetest' //multipleStatements: true

}); // function query(sql, callback) {
//     pool.query(sql, function (err, result) {
//         callback(result)
//     })
// }

function query(sql) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, function (err, result) {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
}

module.exports = {
  query: query
};