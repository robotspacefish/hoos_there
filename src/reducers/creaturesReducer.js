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
      return { ...state, sort: action.payload };
    case "UPDATE_TYPE":
      const { key, value } = action.payload;
      return {
        ...state, [key]: value
      }
    default:
      return state;
  }
};

