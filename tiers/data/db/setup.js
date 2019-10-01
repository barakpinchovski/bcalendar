const config = require('./config');
const MongoClient = require('mongodb').MongoClient;

// Create database
MongoClient.connect(`${config.url()}/${config.database}`, (err, db) => {
  if (err) throw err;
  console.log(`Database ${config.database} created successfully.`);
  db.close();
});

// Create collections
MongoClient.connect(`${config.url()}`, (err, db) => {
  if (err) throw err;
  const dbo = db.db(config.database);
  dbo.createCollection(config.imagesCollection, (err, res) => {
    if (err) throw err;
    console.log(`Collection ${config.imagesCollection} created!`);
    db.close();
  });
});