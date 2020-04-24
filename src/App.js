import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Clock from './Clock/Clock';
import './App.css';

const moment = require('moment')
const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  state = {
    currentCreatures: [],
    now: moment()
  }

  updateCurrentTime = () => (
    this.setState({ now: moment() })
  );
  render() {
    const formattedCurrentTime = this.state.now.format("dddd, MMMM Do YYYY, h:mm:ss A");
    return (
      <div className="App">
        {/*< Header />*/}
        <Clock now={formattedCurrentTime} updateCurrentTime={this.updateCurrentTime} />
        <CreaturesContainer currentCreatures={this.state.currentCreatures} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
