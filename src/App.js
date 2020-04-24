import React, { Component } from 'react';
import CreaturesContainer from './Creatures/CreaturesContainer';

import './App.css';

const json = require('./assets/creatures.json');

class App extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  state = {
    currentCreatures: []
  }

  render() {
    return (
      <div className="App">
        {/* header */}
        <CreaturesContainer currentCreatures={this.state.currentCreatures} />
        {/* footer */}
      </div>
    );
  }
}

export default App;
