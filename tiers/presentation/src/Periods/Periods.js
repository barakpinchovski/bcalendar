import React, { Component } from 'react';
import './Periods.scss';

import Period from '../Period/Period';

class Periods extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  fetchImages = () => {
    // current period format is yyyy-mm
    fetch(`http://localhost:8200/images?y=${this.props.currentPeriod.split('-')[0]}&m=${this.props.currentPeriod.split('-')[1]}`, {
      method: 'GET'
    })
      .then(response =>
        response.json()
      )
      .then(data => {
        this.setState({images: data});
      })
      .catch(err => {
        console.error('Error:', err)
      });
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentPeriod !== prevProps.currentPeriod) {
      this.fetchImages();
    }
  }

  render() {
    let daysInMonth = [...Array(28).keys()];
    // current period format is yyyy-mm
    let y = parseInt(this.props.currentPeriod.split('-')[0], 10);
    let m = parseInt(this.props.currentPeriod.split('-')[1], 10);
    let periods = daysInMonth.map((val, index) => {
      let images = this.state.images.filter(image => parseInt(image.year, 10) === y && parseInt(image.month, 10) === m && parseInt(image.day, 10) === (index + 1));
      return <Period key={`${y}_${m}_${index + 1}`} year={y} month={m} day={index + 1} currentPeriod={this.props.currentPeriod} images={images}/>
    });
    return (
      <div>{periods}</div>
    );
  }
}

export default Periods;