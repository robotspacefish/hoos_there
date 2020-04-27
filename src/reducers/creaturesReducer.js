const defaultState = {
  currentCreatures: [],
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
      };
    case "UPDATE_SORT_TYPE":
      return { ...state, sort: { ...state.sort, ...action.payload } };
    default:
      return state;
  }
};

