const mongodb = require('mongodb');
const dns = require('node:dns');
const dotenv = require('dotenv').config();
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Google's DNS

//.env variables
const url = process.env.MONGODB_URL;
const MongoClient = mongodb.MongoClient;
let _db;

//From Online MongoDB Atlas
const mongoConnect = (callback) => {
    MongoClient.connect(url).then((client) => {
        _db = client.db('airbnb');
        callback();
    }).catch((err) => {
        console.log(err);
        throw err;
    });
};

const getDB = () => {
    if(!_db){
        throw new Error('Database not connected');
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;