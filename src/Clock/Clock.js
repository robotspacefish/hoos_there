import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
  // TODO update clock and update creatures when hour changes
  // componentDidMount() {
  //   this.timerID = setInterval(() => this.tick(), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  // tick() {
  //   this.props.updateCurrentTime();
  // }

  render() {
    return (
      <div className="Clock">
        {this.props.now}
      </div>
    );
  }
}

export default Clock;