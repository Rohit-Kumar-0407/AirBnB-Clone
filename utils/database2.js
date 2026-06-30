const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = '';     //From Online MongoDB Atlas

const mongoConnect = (callback) => {
    MongoClient.connect(url).then((client) => {
        console.log('Connected to MongoDB');
        callback(client);
    }).catch((err) => {
        console.log(err);
    });
};
