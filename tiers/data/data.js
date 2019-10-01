const config = require('./db/config');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.url(), (err, db) => {
  if (err) throw err;

  db.close();
});



