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
    sort: { type: 'default', direction: 'default' }
  }

  sortCreatures = (creatures) => {
    let sortedCreatures;
    switch (this.state.sort.type) {
      case 'name':
      case 'type':
      case 'location':
        sortedCreatures = sortAlpha(creatures, this.state.sort.type)
        break;
      case "shadow":
        sortedCreatures = this.sortByShadowSize(creatures);
        break;
      case "price":
        sortedCreatures = sortNumeric(creatures, "price")
        break;
      default:
    }

    // // dsc sort
    if (this.state.sort.direction === 'dsc') sortedCreatures = sortedCreatures.reverse()
    return sortedCreatures;
  };

  sortByShadowSize(creatures) {
    const type = 'shadow_size'
    // splice 'narrow' into separate array
    const narrowOrNACreatures = creatures.filter(c => c.shadow_size === "Narrow" || c.shadow_size === "NA");
    const nonNarrowCreatures = creatures.filter(c => c.shadow_size !== "Narrow" && c.shadow_size !== "NA").map(c => (
      { ...c, shadow_size: parseInt(c.shadow_size) }
    ));
    const sortedNarrowOrNaCreatures = sortAlpha(narrowOrNACreatures, type);
    const sortedNonNarrowCreatures = sortNumeric(nonNarrowCreatures, type);

    return [...sortedNarrowOrNaCreatures, sortedNonNarrowCreatures].flat();
  }

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

  updateSortType = (type) => {
    let direction = 'asc';
    if (type === this.state.sort.type) {
      // if the sort just clicked was the last one clicked, reverse the sort direction
      direction = this.state.sort.direction === 'asc' ? 'dsc' : 'asc'
    }
    this.setState({ sort: { type, direction } });
  };


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

  filterByDisplayTypeAndSort = () => {
    const creatures = this.filterByDisplayType();
    return this.state.sort.type === 'default' ?
      creatures : this.sortCreatures(creatures);
  }

  render() {
    const formattedCurrentTime = this.state.now.format("dddd, MMMM Do YYYY, h:mm:ss A");
    const creatures = this.filterByDisplayTypeAndSort();
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
          updateSortType={this.updateSortType}
        />
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default App;
