import { sortAlpha, sortNumeric } from './helpers';

export const allSortsAndFilters = (sort, displayType, currentCreatures, query) => {
  const creatures = filterByDisplayType(displayType, currentCreatures);
  const queriedCreatures = query === '' ? creatures : queryCreatures(creatures, query);
  /** TODO handle no results */
  return sort.type === 'default' ?
    queriedCreatures : sortCreatures(sort, queriedCreatures);
}

const queryCreatures = (creatures, q) => {
  /** Search by name, location, or price */
  const query = q.toLowerCase();
  return creatures.filter(creature => (
    creature.name.toLowerCase().includes(query) ||
    creature.location.toLowerCase().includes(query) ||
    creature.type.toLowerCase().includes(query) ||
    creature.price.includes(query)
  ));
};

const filterByDisplayType = (displayType, currentCreatures) => {
  return displayType === 'all' ?
    currentCreatures :
    currentCreatures.filter(creature => creature.type === displayType);
}

const sortCreatures = (sort, creatures) => {
  let sortedCreatures;
  switch (sort.type) {
    case 'name':
    case 'type':
    case 'location':
      sortedCreatures = sortAlpha(creatures, sort.type)
      break;
    case "shadow":
      sortedCreatures = sortByShadowSize(creatures);
      break;
    case "time":
      sortedCreatures = sortByAvailableTime(creatures);
      break;
    case "price":
      sortedCreatures = sortNumeric(creatures, sort.type)
      break;
    default:
  }
  // // dsc sort
  if (sort.direction === 'dsc') sortedCreatures = sortedCreatures.reverse()

  return sortedCreatures;

};

const sortByShadowSize = (creatures) => {
  // some creatures don't have a shadow, some have a 'narrow' shadow
  // I separated them from number size shadows, converted those to integers,
  // sorted, and joined and flatted those 2 arrays in 'asc' order
  const type = 'shadow_size'
  const narrowOrNACreatures = creatures.filter(c => c.shadow_size === "Narrow" || c.shadow_size === "NA");
  const nonNarrowCreatures = creatures.filter(c => c.shadow_size !== "Narrow" && c.shadow_size !== "NA").map(c => (
    { ...c, shadow_size: parseInt(c.shadow_size) }
  ));
  const sortedNarrowOrNaCreatures = sortAlpha(narrowOrNACreatures, type);
  const sortedNonNarrowCreatures = sortNumeric(nonNarrowCreatures, type);

  return [...sortedNarrowOrNaCreatures, sortedNonNarrowCreatures].flat();
}

const sortByAvailableTime = creatures => (
  [...creatures].sort((a, b) => {
    const creatureA = getCreaturesFirstTimeAvailable(a);
    const creatureB = getCreaturesFirstTimeAvailable(b);

    return creatureA.start_time - creatureB.start_time
  })
);

const getCreaturesFirstTimeAvailable = creature => (
  // if creature has 1 available time, return that, otherwise sort the times
  // and return the first one
  creature.available_times.length === 1 ?
    { ...creature.available_times[0] } : [...creature.available_times].sort((availA, availB) => availA.start_time - availB.start_time)[0]
);