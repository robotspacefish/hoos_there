import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Clock from './Clock/Clock';
import Container from 'react-bootstrap/Container';
import { sortAlpha, sortNumeric } from './helpers/helpers';

import './App.css';

const moment = require('moment')
const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json)),
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  };

  state = {
    currentCreatures: [],
    now: moment(),
    startingHour: null,
    hemisphere: "north",
    displayType: "all",
    sort: {
      name: null,
      type: null,
      location: null,
      shadow: null,
      time: null,
      price: null
    }
  }

  sortCreatures = type => {
    // if this.state.sort[type] === null sort 'asc', if 'dsc' sort 'asc'
    let sortedCreatures;
    let sortDirection = 'asc';

    switch (type) {
      case 'name':
      case 'type':
      case 'location':
        sortedCreatures = sortAlpha(this.state.currentCreatures, type)

        break;
      case "shadow":
        // todo special case
        break;
      default:
    }

    if (this.state.sort[type] === 'asc') sortDirection = 'dsc';

    this.setState({ sort: { ...this.state.sort, [type]: sortDirection } })

    if (sortDirection === 'dsc') sortedCreatures = sortedCreatures.reverse()
    console.log('sorting by', type)
    console.log(sortedCreatures)
  };

  updateCurrentTime = () => (
    this.setState({ now: moment() })
  );


  isOutAtThisTime(startTime, endTime) {
    let s = moment();
    let e = moment();
    s.hour(startTime)
    e.hour(endTime)
    if (endTime < startTime) e.day(e.day() + 1)
    return this.state.now.isBetween(s, e) && !this.state.now.isSame(e, 'hour');
  }

  isOutInThisMonth(creature) {
    const { hemisphere, now } = this.state;
    const month = this.props.months[now.month()].toLowerCase();
    return creature.hemispheres[hemisphere][month]
  }

  getCurrentlyAvailableCreatures() {
    return this.props.creatures.filter(creature => (
      creature.available_times.every(at => (
        this.isOutInThisMonth(creature) && (at.time === "All day" || this.isOutAtThisTime(at.start_time, at.end_time))
      ))
    ));
  }

  updateType = (type, value) => (this.setState({ [type]: value }));

  updateCurrentCreatures() {
    this.setState({ currentCreatures: this.getCurrentlyAvailableCreatures() })
  }

  componentDidMount() {
    this.updateCurrentCreatures();
    this.setState({ startingHour: this.state.now.hour() })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hemisphere !== this.state.hemisphere) {
      this.updateCurrentCreatures();
    }

    // if the hour changes over, update current creatures
    if (this.state.now.hour() > this.state.startingHour) {
      console.log('getting new creatures at', this.state.now.toString())
      this.setState({
        currentCreatures: this.getCurrentlyAvailableCreatures(),
        startingHour: this.state.now.hour()
      })
    }
  }

  filterByDisplayType = () => {
    const { displayType, currentCreatures } = this.state;
    return displayType === 'all' ?
      currentCreatures :
      currentCreatures.filter(creature => creature.type === displayType);
  }

  render() {
    const formattedCurrentTime = this.state.now.format("dddd, MMMM Do YYYY, h:mm:ss A");
    const creatures = this.filterByDisplayType();
    return (
      <Container>
        {/*< Header />*/}
        <Clock now={formattedCurrentTime} updateCurrentTime={this.updateCurrentTime} />
        <CreaturesContainer
          currentCreatures={creatures}
          updateType={this.updateType}
          displayType={this.state.displayType}
          hemisphere={this.state.hemisphere}
          months={this.props.months}
          sortCreatures={this.sortCreatures}
        />
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default App;
