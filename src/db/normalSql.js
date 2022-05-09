const mysql = require('mysql')

const pool = mysql.createPool({
    host:"localhost",
    user:"Xn",
    password:"123456",
    database:"databasetest"
})


module.exports = {
    query(sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        })
    }
}