import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Header from './Header/Header';
import Clock from './Clock/Clock';
import Container from 'react-bootstrap/Container';
import { sortAlpha, sortNumeric } from './helpers/helpers';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';

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
    startingHour: null,
    hemisphere: "north",
    displayType: "all",
    sort: { type: 'default', direction: 'default', icon: '' }
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
      case "time":
        sortedCreatures = this.sortByAvailableTime(creatures);
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
    // some creatures don't have a shadow, some have a 'narrow' shadow
    // I separated them from number size shadows, converted those to integers,
    // sorted, and joined and flatted those 2 arrays in 'asc' order
    const type = 'shadow_size'
    const narrowOrNACreatures = creatures.filter(c => c.shadow_size === "Narrow" || c.shadow_size === "NA");
    const nonNarrowCreatures = creatures.filter(c => c.shadow_size !== "Narrow" && c.shadow_size !== "NA").map(c => (
      { ...c, shadow_size: parseInt(c.shadow_size) }
    ));
    const sortedNarrowOrNaCreatures = sortAlpha(narrowOrNACreatures, type);
    const sortedNonNarrowCreatures = sortNumeric(nonNarrowCreatures, type);

    return [...sortedNarrowOrNaCreatures, sortedNonNarrowCreatures].flat();
  }

  sortByAvailableTime = creatures => (
    [...creatures].sort((a, b) => {
      const creatureA = this.getCreaturesFirstTimeAvailable(a);
      const creatureB = this.getCreaturesFirstTimeAvailable(b);

      return creatureA.start_time - creatureB.start_time
    })
  );

  getCreaturesFirstTimeAvailable = (creature) => (
    // if creature has 1 available time, return that, otherwise sort the times
    // and return the first one
    creature.available_times.length === 1 ?
      { ...creature.available_times[0] } : [...creature.available_times].sort((availA, availB) => availA.start_time - availB.start_time)[0]
  );

  isOutAtThisTime(startTime, endTime) {
    const { now } = this.props;
    let s = moment();
    let e = moment();
    s.hour(startTime)
    e.hour(endTime)
    if (endTime < startTime) e.day(e.day() + 1)
    return now.isBetween(s, e) && !now.isSame(e, 'hour');
  }

  isOutInThisMonth(creature) {
    const { hemisphere } = this.state;
    const { now } = this.props;

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
    this.props.setCurrentTime();
    this.updateCurrentCreatures();
    this.setState({ startingHour: this.props.now.hour() })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hemisphere !== this.state.hemisphere) {
      this.updateCurrentCreatures();
    }

    // if the hour changes over, update current creatures
    if (this.props.now.hour() > this.state.startingHour) {
      console.log('getting new creatures at', this.props.now.toString())
      this.setState({
        currentCreatures: this.getCurrentlyAvailableCreatures(),
        startingHour: this.props.now.hour()
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
    const creatures = this.filterByDisplayTypeAndSort();
    return (
      <Container>
        < Header />
        <Clock now={this.props.now.format("dddd, MMMM Do YYYY, h:mm A")} updateCurrentTime={this.props.setCurrentTime} />

        <CreaturesContainer
          currentCreatures={creatures}
          updateType={this.updateType}
          displayType={this.state.displayType}
          hemisphere={this.state.hemisphere}
          months={this.props.months}
          updateSortType={this.updateSortType}
          // sortIcon={this.state.sort.icon}
          sortInfo={this.state.sort}
        />
        {/* <Footer /> */}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  now: state.clock.now
});


const mapDispatchToProps = dispatch => ({
  setCurrentTime: () => dispatch(setCurrentTime())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
