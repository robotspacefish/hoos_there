import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.props.updateCurrentTime();
  }

  render() {
    const formattedTime = this.props.now.format("dddd, MMMM D YYYY, h:mm A");

    return (
      <div className="Clock">
        {formattedTime}
      </div>
    );
  }
}

export default Clock;