const ui = require('./requestHandlers/uploadImages');
const gi = require('./requestHandlers/getImages');

module.exports = {
  '/images/upload': ui.uploadImages,
  '/images': gi.getImages
};