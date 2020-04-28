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
      this.updateCurrentCreatures()
    }

    // if the hour changes over, update current creatures
    if (this.props.now.hour() > this.props.startingHour) {
      // TODO get new creatures and compare to state- only update if they
      // differ
      console.log('getting new creatures at', this.props.now.toString())
      this.updateCurrentCreatures();
      this.setState({
        // currentCreatures: this.getCurrentlyAvailableCreatures(),
        // TODO FIX
        startingHour: this.props.now.hour()
      })
    }
  }

  render() {
    // console.log('creaturesContainer: render', this.props)
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