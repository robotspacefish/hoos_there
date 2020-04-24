import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  tick() {
    // TODO
  }

  renderDateTime() {
    const { currentDateTime } = this.props;
    const timeToDisplay = currentDateTime.toLocaleTimeString();
    const dateToDisplay = currentDateTime.toDateString();
    return (
      <div className="Clock container">
        <h2>It is {timeToDisplay} on {dateToDisplay}</h2>
      </div>
    );
  }

  render() {
    return this.renderDateTime();
  }
}

export default Clock;