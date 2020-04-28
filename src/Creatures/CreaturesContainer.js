import React, { Component } from 'react'
import CreatureListHeader from './CreatureListHeader';
import CreatureList from './CreatureList';

import { connect } from 'react-redux';

import { getCurrentlyAvailableCreatures, updateSort, updateType } from '../actions/creatureActions';
import { filterByDisplayTypeAndSort } from '../helpers/sortAndFilterCreatures';

const json = require('../assets/creatures.json');

class CreaturesContainer extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  bugs = creatures => (creatures.filter(c => c.type === "bug"));

  fish = creatures => (creatures.filter(c => c.type === "fish"));

  // updateType = (type, value) => (
  //   this.props.updateType({ [type]: value })
  // );

  updateSortType = type => (
    this.props.updateSortType(this.props.sort, type)
  )

  updateCurrentCreatures() {
    const { getCurrentlyAvailableCreatures, months, hemisphere, now } = this.props;
    getCurrentlyAvailableCreatures(this.props.creatures, months, hemisphere, now);
  }

  componentDidMount() {
    this.updateCurrentCreatures();
  }

  render() {
    const creatures = filterByDisplayTypeAndSort(this.props.sort, this.props.displayType, this.props.currentCreatures);
    return (
      <div className="CreatureContainer">
        <CreatureListHeader
          updateType={this.props.updateType}
          displayType={this.props.displayType}
          hemisphere={this.props.hemisphere}
        />
        <CreatureList
          creatures={creatures}
          hemisphere={this.props.hemisphere}
          months={this.props.months}
          updateSort={this.props.updateSort}
          sortInfo={this.props.sort}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCreatures: state.creatures.currentCreatures,
  hemisphere: state.creatures.hemisphere,
  displayType: state.creatures.displayType,
  sort: state.creatures.sort
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentlyAvailableCreatures: (creatures, months, hemisphere, now) => dispatch(getCurrentlyAvailableCreatures(creatures, months, hemisphere, now)),
    updateSort: (currentSort, type) => dispatch(updateSort(currentSort, type)),
    updateType: (type, value) => dispatch(updateType(type, value))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreaturesContainer);