import React, { Component } from 'react';
import './Calendar.scss';

import Header from "../Header/Header";
import Periods from '../Periods/Periods';


class Calendar extends Component {

  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      view: '', // @todo
      currentPeriod: `${date.getFullYear()}-${("0" + (date.getMonth() + 1) ).slice(-2)}`
    };
  }

  updateCurrentPeriod = (newPeriod) => {
    this.setState({ currentPeriod: newPeriod });
  };

  render() {
    return (
      <div>
        <Header updateCurrentPeriod={this.updateCurrentPeriod}/>
        <Periods currentPeriod={this.state.currentPeriod}/>
      </div>
    );
  }
}

export default Calendar;