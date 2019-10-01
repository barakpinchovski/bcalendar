import React, { Component } from 'react';
import './DateWidget.scss';

class DateWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPeriod: this.defaultDate()
    };
  }

  updateCurrentPeriod= (value) => {
    this.setState({ currentPeriod: value });
    this.props.currentPeriod(value);
  };

  defaultDate = () => {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}`;
  };

  render() {
    return (
      <nav>
        <input id="current-month" type="month" value={this.state.currentPeriod} onChange={e => this.updateCurrentPeriod(e.target.value)}/>
        <button id="this-month" onClick={() => this.updateCurrentPeriod(this.defaultDate())}>Current Month</button>
      </nav>
    );
  }
}

export default DateWidget;