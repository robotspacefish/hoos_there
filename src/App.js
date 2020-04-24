import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';

import './App.css';

const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  state = {
    currentCreatures: [],
    currentTime: new Date()
  }

  render() {
    return (
      <div className="App">
        {/*< Header />*/}
        {/* <Clock /> */}
        <CreaturesContainer currentCreatures={this.state.currentCreatures} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
