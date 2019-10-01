const urlModule = require('url');

const analyzeUrl = (url) => {
  let urlFragments = {
    url: '',
    path: '',
    params: ''
  };
  if (typeof url === 'string' && url) {
    urlFragments.url = url;
    urlFragments.path = urlModule.parse(url).pathname;
    urlFragments.params = urlModule.parse(url).search;
  }
  return urlFragments;
};

const  path = (url) => {
  return analyzeUrl(url).path;
};

const params = (url) => {
  return analyzeUrl(url).params;
};


exports.path = path;
exports.params = params;