import React, { Component } from 'react';
import './Period.scss';
import './Period.css';

class Period extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: `${props.year}-${("0" + props.month).slice(-2)}`,
      currentPeriod: this.props.currentPeriod,
    }
  }

  componentDidMount() {
  }

  render() {
    let current = this.props.currentPeriod === this.state.period ? ' current' : '';
    let images = '';
    if (this.props.images.length) {
      images = this.props.images.map(image => {
        return <img key={image['thumbnail_name']} src={`${image['path']}/${image['thumbnail_name']}`} alt=""/>
      });
    }
    return (
      <div className={`cal-period${current}`}>
        <header>{this.props.year} {this.props.month}  {this.props.day}</header>
        <main>
          {images}
        </main>
      </div>
    );
  }
}

export default Period;