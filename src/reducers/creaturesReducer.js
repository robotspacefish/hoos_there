const defaultState = {
  currentCreatures: [],
  now: null,
  startingHour: null,
  hemisphere: "north",
  displayType: "all",
  sort: { type: 'default', direction: 'default', icon: '' }
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case "GET_CURRENT_CREATURES":
      return {
        ...state,
        currentCreatures: action.payload
      }
    default:
      return state;
  }
};

