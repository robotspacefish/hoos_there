const moment = require('moment');

export const getCurrentlyAvailableCreatures = (creatures, months, hemisphere, now) => {

  const currentCreatures = creatures.filter(creature => (
    creature.available_times.every(at => (
      isOutInThisMonth(creature, months, hemisphere, now) &&
      (at.time === "All day" || isOutAtThisTime(at.start_time, at.end_time, now))
    ))
  ))

  return { type: "GET_CURRENT_CREATURES", payload: currentCreatures }
}

const isOutInThisMonth = (creature, months, hemisphere, now) => {
  const month = months[now.month()].toLowerCase();
  return creature.hemispheres[hemisphere][month]
}

const isOutAtThisTime = (startTime, endTime, now) => {
  let s = moment();
  let e = moment();
  s.hour(startTime)
  e.hour(endTime)
  if (endTime < startTime) e.day(e.day() + 1)
  return now.isBetween(s, e) && !now.isSame(e, 'hour');
}

export const updateSort = (currentSort, type) => {
  let direction = 'asc';
  if (type === currentSort.type) {
    // if the sort just clicked was the last one clicked, reverse the sort direction
    direction = currentSort.direction === 'asc' ? 'dsc' : 'asc'
  }

  const icon = updateSortIcon(currentSort, type);

  return { type: "UPDATE_SORT_TYPE", payload: { type, direction, icon } }
};

const updateSortIcon = (currentSort, btnType) => {
  const ascIcon = "fas fa-sort-amount-down-alt";
  const dscIcon = "fas fa-sort-amount-down";

  let icon = ascIcon;

  if (btnType === currentSort.type) {
    icon = currentSort.direction === 'asc' ? dscIcon : ascIcon;
  }

  return icon;
  // this.setState({ buttonContent: updatedBtns });
};
