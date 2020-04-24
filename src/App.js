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

  render() {
    return (
      <div className="App">
        {/*< Header />*/}
        <Clock now={this.state.now.format("dddd, MMMM Do YYYY, h:mm A")} />
        <CreaturesContainer currentCreatures={this.state.currentCreatures} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
