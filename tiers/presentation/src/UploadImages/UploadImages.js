import React, { Component } from 'react';
import './UploadImages.scss';
import EXIF from '/Programming/calendar4/tiers/presentation/libraries/exif/exif.js';

class UploadImages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      processedImages: 0,
      imagesCount: 0
    };
    this.initialState = this.state;
  }

  resetStates = () => {
    this.setState(this.initialState);
  };

  handleImageUpload = (event) => {
    this.resetStates();

    if (event.target.files.length) {
      this.setState({ imagesCount: event.target.files.length });

      for (let i = 0; i < event.target.files.length; i++) {
        this.uploadImages(event.target.files[i]);
      }
    }
  };

  uploadImages = (image) => {
    const path = "/images/upload";
    const formData = new FormData();

    if (image) {
      EXIF.getData(image, () => {
        formData.append(`${image.exifdata.DateTimeOriginal}_${image.name}`, image);
        formData.append(`${image.exifdata.DateTimeOriginal}_${image.name}`, JSON.stringify(image.exifdata));

        fetch(`http://localhost:8200${path}`, {
          method: 'POST',
          body: formData
        })
          .then(response =>
            response.json()
          )
          .then(data => {
            this.setState((state) => ({processedImages:  state.processedImages + 1 }));
            this.setState((state) => ({progressValue: (state.processedImages / state.imagesCount) * 100}));
          })
          .catch(error =>
            console.error('Error:', error)
          );
      });
    }
  };

  render() {
    return (
      <div>
        <details>
          <summary>Upload Images</summary>
          <input type="file" name="upload_images" multiple accept="image/*" onChange={this.handleImageUpload}/>
          <progress value={this.state.progressValue} max="100" >Your browser doesn't support the progress tag.</progress>
        </details>
      </div>
    );
  }
}

export default UploadImages;