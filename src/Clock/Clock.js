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
    return (
      <div className="Clock">
        {this.props.now}
      </div>
    );
  }
}

export default Clock;