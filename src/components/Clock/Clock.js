import React, { Component } from 'react';
import dayjs from 'dayjs';
import { format } from '../../helpers/helpers';
import './Clock.scss';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startMinute: dayjs().minute()
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const currentMinute = dayjs().minute();

    if (this.state.startMinute !== currentMinute) {
      this.props.updateCurrentTime();
      this.setState({ startMinute: currentMinute });
    }
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