import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

function mockReducer(state = {}, action) {
  return state;
}

const initReducers = () => combineReducers({
  mockReducer,
});

const add = asyncReducers => combineReducers({
  ...asyncReducers
});

const history = createBrowserHistory();

const addReducer = store => reducer => {
  if(!store.asyncReducers){
    store.asyncReducers = { router: connectRouter(history) };
  }
  
  store.asyncReducers[reducer.reducerName] = reducer;
  store.replaceReducer(add(store.asyncReducers));
}

export {
  initReducers,
  addReducer,
  history,
}