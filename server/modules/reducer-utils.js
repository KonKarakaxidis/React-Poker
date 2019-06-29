import { combineReducers } from 'redux';

function mockReducer(state = {}, action) {
  return state;
}

const initReducers = () => combineReducers({
  mockReducer,
});

const add = asyncReducers => combineReducers({
  ...asyncReducers
});

const addReducer = store => reducer => {
  if(!store.asyncReducers){
    store.asyncReducers = {};
  }
  
  store.asyncReducers[reducer.reducerName] = reducer;
  store.replaceReducer(add(store.asyncReducers));
}

export {
  initReducers,
  addReducer
}