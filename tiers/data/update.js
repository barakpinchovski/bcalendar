const connect = require('./connect');

one = (collection, query, data) => {
  connect.connect((dbo) => {
    dbo.collection(collection).updateOne(query, { $set: data }, (err, res) => {
      if (err) throw err;
      console.log("1 document updated");
      dbo.close();
    });
  });
};

many = (collection, query, data) => {
  connect.connect((dbo) => {
    dbo.collection(collection).updateMany(query, { $set: data }, (err, res) => {
      if (err) throw err;
      console.log(`Number of documents updated:  ${res.result.nModified}`);
      dbo.close();
    });
  })
};

exports.one = one;
exports.many = many;