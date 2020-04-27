import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Container from 'react-bootstrap/Container';
// import { sortAlpha, sortNumeric } from './helpers/helpers';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';
import { getCurrentlyAvailableCreatures, updateSortType } from './actions/creatureActions';
import { filterByDisplayTypeAndSort } from './helpers/sortAndFilterCreatures';

import './App.css';

const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json)),
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  };

  updateType = (type, value) => (this.setState({ [type]: value }));

  // updateSortType = (type) => {
  //   let direction = 'asc';
  //   if (type === this.state.sort.type) {
  //     // if the sort just clicked was the last one clicked, reverse the sort direction
  //     direction = this.state.sort.direction === 'asc' ? 'dsc' : 'asc'
  //   }
  //   this.setState({ sort: { type, direction } });
  // };


  updateCurrentCreatures() {
    const { getCurrentlyAvailableCreatures, creatures, months, hemisphere, now } = this.props;
    getCurrentlyAvailableCreatures(creatures, months, hemisphere, now);
  }

  componentDidMount() {
    this.props.setCurrentTime();
    this.updateCurrentCreatures();
    // TODO FIX
    this.setState({ startingHour: this.props.now.hour() })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hemisphere !== this.props.hemisphere) {
      this.updateCurrentCreatures();
    }

    // if the hour changes over, update current creatures
    // TODO FIX
    if (this.props.now.hour() > this.state.startingHour) {
      // TODO get new creatures and compare to state- only update if they
      // differ
      console.log('getting new creatures at', this.props.now.toString())
      this.updateCurrentCreatures();
      this.setState({
        // currentCreatures: this.getCurrentlyAvailableCreatures(),
        // TODO FIX
        startingHour: this.props.now.hour()
      })
    }
  }

  updateSortType = type => (
    this.props.updateSortType(this.props.sort, type)
  )

  render() {
    const creatures = filterByDisplayTypeAndSort(this.props.sort, this.props.displayType, this.props.currentCreatures);
    return (
      <Container>
        < Header now={this.props.now.format("dddd, MMMM Do YYYY, h:mm A")} updateCurrentTime={this.props.setCurrentTime} />

        <CreaturesContainer
          currentCreatures={creatures}
          updateType={this.updateType}
          displayType={this.props.displayType}
          hemisphere={this.props.hemisphere}
          months={this.props.months}
          updateSortType={this.updateSortType}
          sortInfo={this.props.sort}
        />
        <Footer />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  now: state.clock.now,
  currentCreatures: state.creatures.currentCreatures,
  hemisphere: state.creatures.hemisphere,
  displayType: state.creatures.displayType,
  sort: state.creatures.sort
});


const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: () => dispatch(setCurrentTime()),
    getCurrentlyAvailableCreatures: (creatures, months, hemisphere, now) => dispatch(getCurrentlyAvailableCreatures(creatures, months, hemisphere, now)),
    updateSortType: (currentSort, type) => dispatch(updateSortType(currentSort, type))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
