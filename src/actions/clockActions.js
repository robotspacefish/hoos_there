const dayjs = require('dayjs');

export const setCurrentTime = () => {
  return { type: "SET_CURRENT_TIME", payload: dayjs() }
}

export const updateStartingHour = hour => {
  return { type: "UPDATE_STARTING_HOUR", payload: hour }
}