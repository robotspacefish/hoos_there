const moment = require('moment');
const now = moment();

export default function clock(state = { now, startingHour: now.hour() }, action) {
  switch (action.type) {
    case "SET_CURRENT_TIME":
      return {
        ...state,
        now: action.payload
      }
    case "UPDATE_STARTING_HOUR":
      return {
        ...state,
        startingHour: action.payload
      };
    default:
      return state;
  }
}