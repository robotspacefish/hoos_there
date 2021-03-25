const defaultState = {
  currentCreatures: [],
  hemisphere: "north",
  displayType: "all",
  sort: { type: 'default', direction: 'default', icon: '' },
  query: '',
  newThisMonth: [],
  leavingNextMonth: [],
  leftThisMonth: []
};

export default function creature(state = defaultState, action) {
  switch (action.type) {
    case "GET_CURRENT_CREATURES":
      return {
        ...state,
        currentCreatures: action.payload
      };
    case "UPDATE_SORT_TYPE":
      return { ...state, sort: action.payload };
    case "UPDATE_TYPE":
      // responsible for updating type of creature to display and hemisphere
      const { key, value } = action.payload;
      return {
        ...state, [key]: value
      };
    case "UPDATE_QUERY":
      return { ...state, query: action.payload };
    case "UPDATE_NEW_THIS_MONTH":
      return {
        ...state,
        newThisMonth: action.payload
      };
    case "UPDATE_LEAVING_NEXT_MONTH":
      return {
        ...state,
        leavingNextMonth: action.payload
      };
    case "UPDATE_LEFT_THIS_MONTH":
      return {
        ...state,
        leftThisMonth: action.payload
      };
    default:
      return state;
  }
};

