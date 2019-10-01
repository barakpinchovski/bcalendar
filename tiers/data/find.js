const connect = require('./connect');

find = (collection, callback, query = {}, projection = {}, sort = {}) => {
  connect.connect((dbo) => {
    dbo.collection(collection).find(query, projection).sort(sort).toArray((err, res) => {
      if (err) throw err;
      callback(res);
    });
  });
};

exports.find = find;