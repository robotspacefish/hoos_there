import React, { Component } from 'react'
import CreatureListHeader from './CreatureListHeader';
import CreatureList from './CreatureList';
import Search from '../Search/Search';

import { connect } from 'react-redux';

import { getCurrentlyAvailableCreatures, updateSort, updateType, updateQuery } from '../actions/creatureActions';
import { updateStartingHour } from '../actions/clockActions';

import { allSortsAndFilters } from '../helpers/sortAndFilterCreatures';
const json = require('../assets/creatures.json');

class CreaturesContainer extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

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

  componentDidUpdate(prevProps) {
    if ((prevProps.hemisphere) !== this.props.hemisphere) {
      this.updateCurrentCreatures();
    }

    // if the hour changes over, update current creatures
    if (this.props.now.hour() > this.props.startingHour) {
      // TODO get new creatures and compare to state- only update if they
      // differ

      this.updateCurrentCreatures();
      this.props.updateStartingHour(this.props.now.hour());
    }
  }

  renderCreatureList() {
    const creatures = allSortsAndFilters(this.props.sort, this.props.displayType, this.props.currentCreatures, this.props.query);
    return (
      <>
        <Search updateQuery={this.props.updateQuery} query={this.props.query} />
        <CreatureListHeader
          updateType={this.props.updateType}
          displayType={this.props.displayType}
          hemisphere={this.props.hemisphere}
        />
        <CreatureList
          creatures={creatures}
          updateSort={this.props.updateSort}
          sortInfo={this.props.sort}
        />
      </>
    )
  }

  render() {
    return (
      <div className="CreatureContainer">
        {this.renderCreatureList()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCreatures: state.creatures.currentCreatures,
  hemisphere: state.creatures.hemisphere,
  displayType: state.creatures.displayType,
  sort: state.creatures.sort,
  query: state.creatures.query
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentlyAvailableCreatures: (creatures, months, hemisphere, now) => dispatch(getCurrentlyAvailableCreatures(creatures, months, hemisphere, now)),
    updateSort: (currentSort, type) => dispatch(updateSort(currentSort, type)),
    updateType: (type, value) => dispatch(updateType(type, value)),
    updateQuery: query => dispatch(updateQuery(query)),
    updateStartingHour: hour => dispatch(updateStartingHour(hour))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreaturesContainer);