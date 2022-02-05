import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import company from './reducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  company
});
export default rootReducer;
