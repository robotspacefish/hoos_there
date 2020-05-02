const moment = require('moment');

export const getCurrentlyAvailableCreatures = (creatures, months, hemisphere, now) => {
  const currentCreatures = creatures.filter(creature => (
    creature.available_times.every(at => (
      isOutInThisMonth(creature, months, hemisphere, now) &&
      (isOutAtThisTime(at, now))
    ))
  ))

  return { type: "GET_CURRENT_CREATURES", payload: currentCreatures }
}

const isOutInThisMonth = (creature, months, hemisphere, now) => {
  const month = months[now.month()].toLowerCase();
  return creature.hemispheres[hemisphere][month]
}

const isOutAtThisTime = (availableTimes, now) => {
  const startTime = availableTimes.start_time,
    endTime = availableTimes.end_time;

  if (availableTimes.time === "All day") return true;

  let s = moment();
  let e = moment();
  s.hour(startTime)
  e.hour(endTime)

  if (endTime < startTime) e.day(e.day() + 1)

  // if current time is between start and end times or
  // if current time is between start time and end time is the next day
  return (s.hour() <= now.hour() && e.hour() > now.hour()) ||
    (now.hour() < e.hour() && e.hour() < s.hour() && e.day() > now.day()) ||
    (s.hour() <= now.hour() && e.day() > now.day());
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
};

export const updateType = (type, value) => {
  return { type: "UPDATE_TYPE", payload: { key: type, value } };
};

export const updateQuery = query => {
  return { type: "UPDATE_QUERY", payload: query }
}