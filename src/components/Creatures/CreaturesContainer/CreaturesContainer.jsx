import React, { Component } from 'react'
import { connect } from 'react-redux';

import ListHeader from '../ListHeader/ListHeader';
import List from '../List/List';
import Search from '../../Search/Search';

import {
  getCurrentlyAvailableCreatures,
  updateSort,
  updateType,
  updateQuery,
  newThisMonth,
  leavingNextMonth,
  leftThisMonth
} from '../../../actions/creatureActions';

import { updateStartingHour } from '../../../actions/clockActions';

import { allSortsAndFilters } from '../../../helpers/sortAndFilterCreatures';

import './CreaturesContainer.scss';

const json = require('../../../assets/creatures.json');

class CreaturesContainer extends Component {
  static defaultProps = {
    creatures: JSON.parse(JSON.stringify(json))
  };

  componentDidMount() {
    this.updateCurrentCreatures();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.hemisphere) !== this.props.hemisphere) {
      this.updateCurrentCreatures();
    }

    // if the hour changes over, update current creatures & set new startingHour
    if (this.props.now.hour() !== this.props.startingHour) {

      this.updateCurrentCreatures();
      this.props.updateStartingHour(this.props.now.hour());
    }
  }

  shouldComponentUpdate(nextProps) {
    let current = { ...this.props };
    let next = { ...nextProps };

    /* now changes every minute and I don't need this to re-render when it does */
    delete current.now;
    delete next.now;
    return JSON.stringify(current) !== JSON.stringify(next) || this.props.startingHour !== nextProps.now.hour();
  }

  updateSortType = type => (
    this.props.updateSortType(this.props.sort, type)
  )

  updateCurrentCreatures() {
    const { getCurrentlyAvailableCreatures, months, hemisphere, now } = this.props;
    getCurrentlyAvailableCreatures(this.props.creatures, months, hemisphere, now);

    // TODO move these to only update when the month changes
    this.getNewThisMonth();
    this.getLeavingNextMonth();
    this.getLeftThisMonth();
  }

  getNewThisMonth() {
    const { newThisMonth, creatures, hemisphere, now, months } = this.props;
    newThisMonth(creatures, hemisphere, now, months);
  }

  getLeavingNextMonth() {
    const { leavingNextMonth, creatures, hemisphere, now, months } = this.props;
    leavingNextMonth(creatures, hemisphere, now, months);
  }

  getLeftThisMonth() {
    const { leftThisMonth, creatures, hemisphere, now, months } = this.props;
    leftThisMonth(creatures, hemisphere, now, months);
  }

  renderCreatureList() {
    const creatures = allSortsAndFilters(this.props.sort, this.props.displayType, this.props.currentCreatures, this.props.query);

    return (
      <>
        <Search updateQuery={this.props.updateQuery} query={this.props.query} />
        <ListHeader
          updateType={this.props.updateType}
          displayType={this.props.displayType}
          hemisphere={this.props.hemisphere}
        />
        <List
          creatures={creatures}
          updateSort={this.props.updateSort}
          sortInfo={this.props.sort}
        />
      </>
    )
  }

  render() {
    console.log('RENDER CREATURES CONTAINER')
    return (
      <div className="CreaturesContainer">
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
    updateStartingHour: hour => dispatch(updateStartingHour(hour)),
    newThisMonth: (creatures, hemisphere, now, months) => dispatch(newThisMonth(creatures, hemisphere, now, months)),
    leavingNextMonth: (creatures, hemisphere, now, months) => dispatch(leavingNextMonth(creatures, hemisphere, now, months)),
    leftThisMonth: (creatures, hemisphere, now, months) => dispatch(leftThisMonth(creatures, hemisphere, now, months))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreaturesContainer);