const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Rohit@1234",
    database: "airbnb"  
})
console.log('Connected To MYSQL');

module.exports = pool.promise();