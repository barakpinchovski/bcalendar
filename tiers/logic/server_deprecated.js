let http = require('http');
let url = require('url');
var path = require('path');
const cors = require('cors');
let formidable = require('formidable');

// app.use(cors());
// http.createServer((request, response) => {
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
//     'Access-Control-Max-Age': 2592000, // 30 days
//     /** add other headers as per requirement */
//     'Content-Type': 'application/json'
//   };
//   response.writeHead(204, headers);
//   response.end(JSON.stringify({ ba: 1 }));
// }).listen(8200);
//
// const http = require('http');
// const port = 8080;

http.createServer((req, res) => {
  if (req.url === '/uploadImage') {
    console.log('uploading...');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files.length);
      console.log('File uploaded...');
    });
  }
  else {
    console.log('barak');
  }
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end(JSON.stringify({ ba: 1 }));
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ ba: 'Barak' }));
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
}).listen(8200);