import React, { Component } from 'react';
import { format } from '../../helpers/helpers';
import './Clock.scss';

class Clock extends Component {

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  shouldComponentUpdate(nextProps) {
    return format(this.props.now) !== format(nextProps.now);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.props.updateCurrentTime();
  }

  render() {
    const formattedTime = format(this.props.now);

    return (
      <div className="Clock">
        {formattedTime}
      </div>
    );
  }
}

export default Clock;