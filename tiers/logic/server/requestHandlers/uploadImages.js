const serverConfig = require('../config');
const formidable = require('formidable');
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const mkdirp = require('mkdirp');
const ImagesModel = require('../../../data/db/collections/ImagesModel');
const mongoInsert = require('../../../data/insert');

const uploadImages = (request, response) => {
  let form = new formidable.IncomingForm();

  form.parse(request, (err, fields, files) => {
    let images = [];

    for (let key in files) {
      if (files.hasOwnProperty(key) && fields.hasOwnProperty(key)) {
        let image = files[key];
        let tempPath = image.path;

        // Set the image upload path to its original date if EXIF data or default to today if it doesn't
        let d = new Date();
        let dateArr = [ d.getFullYear(), d.getMonth(), d.getDate() ];
        let imageExif = JSON.parse(fields[key]);
        if (imageExif && imageExif.DateTimeOriginal) {
          dateArr = imageExif.DateTimeOriginal.split(' ')[0].split(':');
        }
        let uploadPath = `${serverConfig.fullPath}/${dateArr[0]}/${dateArr[1]}/${dateArr[2]}`;
        let imagePath = `${serverConfig.uploadPath}/${dateArr[0]}/${dateArr[1]}/${dateArr[2]}`;

        // Create the dir and move the file into it
        mkdirp(uploadPath, (err) => {
          if (err) {
            console.log(`Error while trying to create the directory '${uploadPath}': ${err}`);
            response.end(JSON.stringify({ error: err }));
          }
          else {
            upload(tempPath, uploadPath, image.name, response);
            let imageModel = new ImagesModel(image, imageExif, imagePath);
            images = [...images, imageModel.model];
            insert(images);
          }
        });

      }
    }
  });
};

const upload = (tempPath, uploadPath, imageName, response) => {
  fs.rename(tempPath, `${uploadPath}/${imageName}`, (err) => {
    if (err) {
      console.log(`File upload error: ${err}`);
      fs.unlink(uploadPath);
      fs.rename(uploadPath, tempPath);
      response.end(JSON.stringify({ error: err }));
    }
    else {
      thumb({
        source: `${uploadPath}/${imageName}`,
        destination: uploadPath,
        width: 70,
      }).then(files => {
        if (files[0]) {
          fs.rename(files[0].dstPath, files[1].srcPath);
          console.log('Image thumbnail was uploaded.');
        }
      }).catch(e => {
        console.log(e);
      });

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
        'Content-Type': 'application/json'
      };
      response.writeHead(200, headers);
      response.end(JSON.stringify({ success: 1 }));
      console.log('File was uploaded');
    }
  });
};

const insert = (images) => {
  if (images.length) {
    mongoInsert.uniqueId(ImagesModel.collectionName, images);
  }
};

exports.uploadImages = uploadImages;