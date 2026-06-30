const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost:3306",
    user: "root",
    password: "Rohit@1234",
    database: "AirBnB-clone"  
})

module.exports = pool.promise();