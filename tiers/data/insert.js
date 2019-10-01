const connect = require('./connect');
const mongoFind = require('./find');

one = (collection, data) => {
  connect.connect((dbo) => {
    dbo.collection(collection).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("1 document inserted");
    });
  });
};

many = (collection, data) => {
  connect.connect((dbo) => {
    dbo.collection(collection).insertMany(data, (err, res) => {
      if (err) throw err;
      console.log(`Number of documents inserted: ${res.insertedCount}`);
    });
  })
};

uniqueId = (collection, data) => {
  connect.connect((dbo) => {
    for (let d of data) {
      mongoFind.find(collection,
        (res) => {
          if (!res.length) {
            this.one(collection, d);
          }
        }, { _id: d._id });
    }
  })
};

exports.one = one;
exports.many = many;
exports.uniqueId = uniqueId;