const config = require('./db/config');
const MongoClient = require('mongodb').MongoClient;

connect = (executeFn) => {
  MongoClient.connect(config.url(), { useNewUrlParser: true },(err, db) => {
    if (err) throw err;
    let dbo = db.db(config.database);
    executeFn(dbo);
  });
};

exports.connect = connect;