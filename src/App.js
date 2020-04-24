import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Clock from './Clock/Clock';

import './App.css';

const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  state = {
    currentCreatures: [],
    currentDateTime: new Date()
  }

  render() {
    return (
      <div className="App">
        {/*< Header />*/}
        <Clock currentDateTime={this.state.currentDateTime} />
        <CreaturesContainer currentCreatures={this.state.currentCreatures} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
