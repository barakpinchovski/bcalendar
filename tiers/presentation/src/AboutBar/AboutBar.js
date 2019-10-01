import React, { Component } from 'react';
import './AboutBar.css';

class AboutBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article id="about-bar">
        <header>
          <h2>Bar Abraham Pinchovski</h2>
          <h3>Born: <span className="text">28.9.2018 03:05:00</span></h3>
          <h3>Age: <span className="age text"></span></h3>
        </header>
        <main className="clearfix">
          <section>
            <h3>About Me</h3>
            <p>
              Born in Soroka on 28.9.2018 to Rony and Barak Pinchovski.
            </p>
            <p>
              Bar is our lovely baby boy.
            </p>
          </section>
          <aside>
            <h3>Milestones</h3>
            <ul>
              <li>
                --date here--
                <ul>
                  <li>action</li>
                </ul>
              </li>
            </ul>
          </aside>
        </main>
      </article>
    );
  }
}

export default AboutBar;