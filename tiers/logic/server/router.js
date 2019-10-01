const urlAnalyzer = require('./urlanalyzer');

const routeByPath = (request, apis, response) => {

  let path = urlAnalyzer.path(request.url);
  console.log(`About to route a request for ${path}`);

  if (apis.hasOwnProperty(path) && typeof apis[path] === 'function') {
    apis[path](request, response);
  }
  else {
    console.log(`No request handler found for ${path}`);
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not Found');
    response.end();
  }
};

exports.routeByPath = routeByPath;