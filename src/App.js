import React, { Component } from 'react';
import Header from './Header/Header';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Footer from './Footer/Footer';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';

import './App.css';

class App extends Component {
  static defaultProps = {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  };

  componentDidMount() {
    this.props.setCurrentTime();
    // this.updateCurrentCreatures();
    // TODO FIX
    this.setState({ startingHour: this.props.now.hour() })
  }

  componentDidUpdate(prevProps, prevState) {

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

  render() {
    return (
      <Container>
        < Header now={this.props.now.format("dddd, MMMM Do YYYY, h:mm A")} updateCurrentTime={this.props.setCurrentTime} />

        <CreaturesContainer
          months={this.props.months}
          now={this.props.now}
        />
        <Footer />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  now: state.clock.now
});


const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: () => dispatch(setCurrentTime())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
