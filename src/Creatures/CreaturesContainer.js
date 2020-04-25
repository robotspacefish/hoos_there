import React, { Component } from 'react'
import CreatureListHeader from './CreatureListHeader';
import CreatureList from './CreatureList';

export default class CreaturesContainer extends Component {
  bugs = creatures => (creatures.filter(c => c.type === "bug"));

  fish = creatures => (creatures.filter(c => c.type === "fish"));

  render() {
    return (
      <>
        <CreatureListHeader setType={this.props.setType} />
        <CreatureList creatures={this.props.currentCreatures} />
      </>
    )
  }
}
