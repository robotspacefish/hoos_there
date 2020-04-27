const moment = require('moment')

export const setCurrentTime = () => {
  return { type: "SET_CURRENT_TIME", payload: moment() }
}