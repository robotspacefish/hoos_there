export const getCurrentlyAvailableCreatures = (creatures, months, hemisphere, now) => {

  const currentCreatures = creatures.filter(creature => (
    // some creatures are out multiple times a day and should be displayed as long as one of those times is current
    creature.available_times.some(at => (
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
  if (availableTimes.time === "All day") return true;

  const startHour = availableTimes.start_time,
    endHour = availableTimes.end_time,
    nowDay = now.day(),
    nowHour = now.hour(),
    endDay = endHour < startHour ? now.day() + 1 : now.day();

  /**
   * if current time is between start and end times or
   * if current time is between start time and end time is the next day
   */
  return (startHour <= nowHour && endHour > nowHour) ||
    (nowHour < endHour && endHour < startHour && endDay > nowDay) ||
    (startHour <= nowHour && endDay > nowDay);
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

export const newThisMonth = (creatures, hemisphere, now, months) => {
  const m = now.month();
  const nm = m === 0 ? 11 : m - 1;

  return {
    type: "UPDATE_NEW_THIS_MONTH",
    payload: creatures.filter(creature => {
      const currentMonth = months[m].toLowerCase();
      const lastMonth = months[nm].toLowerCase();

      return creature.hemispheres[hemisphere][currentMonth] &&
        !creature.hemispheres[hemisphere][lastMonth];
    })
  }
};

export const leavingNextMonth = (creatures, hemisphere, now, months) => {
  // dayjs months are 0 - 11, so if it's dec (11) then next month is jan(0)
  const m = now.month();
  const nm = m === 11 ? 0 : m + 1;

  return {
    type: "UPDATE_LEAVING_NEXT_MONTH",
    payload: creatures.filter(creature => {
      const currentMonth = months[m].toLowerCase();
      const nextMonth = months[nm].toLowerCase();

      return creature.hemispheres[hemisphere][currentMonth] &&
        !creature.hemispheres[hemisphere][nextMonth];
    })
  }
};

export const leftThisMonth = (creatures, hemisphere, now, months) => {
  // dayjs months are 0 - 11, so if it's jan (0) then last month is dec(11)
  const m = now.month();
  const nm = m === 0 ? 11 : m - 1;

  return {
    type: "UPDATE_LEFT_THIS_MONTH",
    payload: creatures.filter(creature => {
      const currentMonth = months[m].toLowerCase();
      const lastMonth = months[nm].toLowerCase();

      return !creature.hemispheres[hemisphere][currentMonth] &&
        creature.hemispheres[hemisphere][lastMonth];
    })
  }
};