import { combineReducers } from 'redux';
import creaturesReducer from './creaturesReducer';
import clockReducer from './clockReducer';

export default combineReducers({
  creaturesReducer,
  clockReducer
});