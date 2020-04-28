const moment = require('moment')

export const setCurrentTime = () => {
  return { type: "SET_CURRENT_TIME", payload: moment() }
}

export const updateStartingHour = hour => {
  return { type: "UPDATE_STARTING_HOUR", payload: hour }
}