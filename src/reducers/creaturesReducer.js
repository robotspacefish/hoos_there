const defaultState = {
  currentCreatures: [],
  now: null,
  startingHour: null,
  hemisphere: "north",
  displayType: "all",
  sort: { type: 'default', direction: 'default', icon: '' }
};

export default function creaturesReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
};

