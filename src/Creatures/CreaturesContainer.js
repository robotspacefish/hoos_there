import React, { Component } from 'react'
import CreatureListHeader from './CreatureListHeader';
import CreatureList from './CreatureList';

export default class CreaturesContainer extends Component {

  render() {
    return (
      <>
        <CreatureListHeader />
        <CreatureList currentCreatures={this.props.currentCreatures} />

      </>
    )
  }
}
