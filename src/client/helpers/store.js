import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { history } from './history';
import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer(history),
  compose(composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history)
  )))
);

export default store;
