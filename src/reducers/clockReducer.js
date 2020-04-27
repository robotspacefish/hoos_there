export default function (state = {}, action) {
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