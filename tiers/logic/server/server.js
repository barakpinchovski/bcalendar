const http = require('http');

createServer = (router, apis, port = 8200) => {

  const onRequest = (request, response) => {
    console.log(`Request for ${request.url} received.`);
    router.routeByPath(request, apis, response);
  };

  http.createServer(onRequest).listen(port);
  console.log("Server has been created.");
};

exports.create = createServer;