const formidable = require('formidable');
const fs = require('fs');
const mkdirp = require('mkdirp');
const ImagesModel = require('../../../data/db/collections/ImagesModel');
const mongoFind = require('../../../data/find');
const urlAnalyzer = require('../urlanalyzer');

const getImages = (request, response) => {
  const params = urlAnalyzer.params(request.url);
  const year = params.split('&')[0].split('=')[1];
  const month = params.split('&')[1].split('=')[1];

  mongoFind.find(ImagesModel.collectionName, (res) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Max-Age': 2592000,
      'Content-Type': 'application/json'
    };
    response.writeHead(200, headers);
    response.end(JSON.stringify(res));
  }, { year, month }, { _id: 0   });
};

exports.getImages = getImages;