import { combineReducers } from 'redux';
import creatures from './creaturesReducer';
import clock from './clockReducer';

export default combineReducers({
  creatures,
  clock
});