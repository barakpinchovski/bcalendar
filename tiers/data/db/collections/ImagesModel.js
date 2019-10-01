const crypto = require('crypto');

class ImagesModel {

  constructor(image, exif, path) {
    this['original_name'] = image.name;
    this['created'] = this.timestamp(exif.DateTimeOriginal  || this.defaultDateTime());
    this['path'] = `${path}`;
    this['thumbnail_name'] = this.extractThumbnailName();
    this.dateTime = this.extractDateTime(exif.DateTimeOriginal  || this.defaultDateTime());
  }

  extractThumbnailName() {
    let extensionIndex = this['original_name'].lastIndexOf('.');
    let imageName = this['original_name'].slice(0, extensionIndex);
    return `${imageName}_thumb${this['original_name'].substr(extensionIndex)}`;
  }

  timestamp(dateTime) {
    return dateTime;
  };

  // exif DateTime format is  'YYYY:MM:DD HH:MM:SS'
  extractDateTime(dateTime) {
    let date = dateTime.split(' ')[0].split(':');
    let time = dateTime.split(' ')[1];
    return { date, time };
  };

  defaultDateTime () {
    let d = new Date();
    return `${d.getFullYear()}:${d.getMonth()}:${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
  };

  static get collectionName() {
    return 'images';
  };

  get model() {
    return {
      _id: crypto.createHash('sha256').update(`${this['original_name']}_${this['created']}`, 'utf8').digest("base64"),
      original_name: this['original_name'],
      given_name: '',
      description: '',
      created: this['created'],
      path: this['path'],
      year: this.dateTime.date[0],
      month: this.dateTime.date[1],
      day: this.dateTime.date[2],
      time: this.dateTime.time,
      thumbnail_name: this['thumbnail_name'],
      rotation: ''
    };
  }
}

module.exports = ImagesModel;