const mongodb = require('mongodb');
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Google's DNS

const MongoClient = mongodb.MongoClient;

const url = 'mongodb+srv://test_user_01:Rk-200604@pulsar-labs-cluster.k4cnmnu.mongodb.net/?appName=Pulsar-Labs-Cluster';     //From Online MongoDB Atlas

const mongoConnect = (callback) => {
    MongoClient.connect(url).then((client) => {
        callback(client);
    }).catch((err) => {
        console.log(err);
    });
};

exports.mongoConnect = mongoConnect;