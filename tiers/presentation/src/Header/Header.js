import React, { Component } from 'react';
import AboutBar from '../AboutBar/AboutBar';
import './Header.scss';

import DateWidget from "../DateWidget/DateWidget";
import UploadImages from "../UploadImages/UploadImages";

class Header extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <h1>Bar's<AboutBar/> Calendar 👶🏻</h1>
        <DateWidget currentPeriod={this.props.updateCurrentPeriod}/>
        <UploadImages/>
        {/*<calendar-view></calendar-view>*/}
      </header>
    );
  }
}

export default Header;