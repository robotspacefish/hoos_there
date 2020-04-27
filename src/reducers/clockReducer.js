const moment = require('moment');

export default function (state = { now: moment() }, action) {
  switch (action.type) {
    case "SET_CURRENT_TIME":
      return {
        ...state,
        now: action.payload
      }
    default:
      return state;
  }
}