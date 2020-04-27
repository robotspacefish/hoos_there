import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Container from 'react-bootstrap/Container';
// import { sortAlpha, sortNumeric } from './helpers/helpers';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';
import { getCurrentlyAvailableCreatures } from './actions/creatureActions';
import { filterByDisplayTypeAndSort } from './helpers/sortAndFilterCreatures';

import './App.css';

const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json)),
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  };

  state = {
    sort: { type: 'default', direction: 'default', icon: '' }
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
    const { getCurrentlyAvailableCreatures, creatures, months, hemisphere, now } = this.props;
    getCurrentlyAvailableCreatures(creatures, months, hemisphere, now);
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
      // TODO get new creatures and compare to state- only update if they
      // differ
      console.log('getting new creatures at', this.props.now.toString())
      this.updateCurrentCreatures();
      this.setState({
        // currentCreatures: this.getCurrentlyAvailableCreatures(),
        startingHour: this.props.now.hour()
      })
    }
  }

  render() {
    const creatures = filterByDisplayTypeAndSort(this.state.sort, this.props.displayType, this.props.currentCreatures);
    return (
      <Container>
        < Header now={this.props.now.format("dddd, MMMM Do YYYY, h:mm A")} updateCurrentTime={this.props.setCurrentTime} />

        <CreaturesContainer
          currentCreatures={creatures}
          updateType={this.updateType}
          displayType={this.state.displayType}
          hemisphere={this.state.hemisphere}
          months={this.props.months}
          updateSortType={this.updateSortType}
          sortInfo={this.state.sort}
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
  displayType: state.creatures.displayType
});


const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: () => dispatch(setCurrentTime()),
    getCurrentlyAvailableCreatures: (creatures, months, hemisphere, now) => dispatch(getCurrentlyAvailableCreatures(creatures, months, hemisphere, now))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
