/**
 * sort
 * update view type
 * update hemisphere type
 */
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