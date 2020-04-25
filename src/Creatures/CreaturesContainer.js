import React, { Component } from 'react'
import CreatureListHeader from './CreatureListHeader';
import CreatureList from './CreatureList';

export default class CreaturesContainer extends Component {
  bugs = creatures => (creatures.filter(c => c.type === "bug"));

  fish = creatures => (creatures.filter(c => c.type === "fish"));


  render() {
    return (
      <>
        <CreatureListHeader
          updateType={this.props.updateType}
          displayType={this.props.displayType}
          hemisphere={this.props.hemisphere}
        />
        <CreatureList creatures={this.props.currentCreatures} />
      </>
    )
  }
}
