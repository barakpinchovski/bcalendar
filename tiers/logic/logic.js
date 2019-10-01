let server = require('./server/server.js');
let router = require('./server/router.js');
let apis = require('./server/apis.js');

server.create(router, apis);