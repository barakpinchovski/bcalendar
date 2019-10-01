const connect = require('./connect');

join = (collection, callback, from, localField, foreignField, as) => {
  connect.connect((dbo) => {
    dbo.collection(collection).aggregate([
      { $lookup:
          {
            from,
            localField,
            foreignField,
            as
          }
      }
    ]).toArray((err, res) => {
      if (err) throw err;
      callback(res);
      dbo.close();
    });
  });
};

exports.join = join;