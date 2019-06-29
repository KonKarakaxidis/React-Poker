import { combineEpics } from 'redux-observable';

import { createStore, applyMiddleware, compose } from 'redux';

import { routerMiddleware } from 'connected-react-router'

import { initReducers, addReducer as addReducerStore, history } from './reducer-utils'

import { getEpicMiddleware, rootEpic} from './epic-utils';

export default (initialState = {}, isNode = false) => {
  const composeEnhancers = isNode
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const { epicMiddleware, addEpic : addEpicStore } = getEpicMiddleware();

  const store = createStore(
    initReducers(),
    initialState,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
        routerMiddleware(history),
      ),
    )
  )
  epicMiddleware.run(rootEpic);

  const addEpic = addEpicStore(store);

  const addReducer = addReducerStore(store);

  const subscribeToStore = (...subscriber) => {
    subscriber.forEach(sub => {
      if(sub.reducerName){
        addReducer(sub)
      }else {
        addEpic(combineEpics(...sub))
      }
    })
  }

  return { store, subscribeToStore, history };
}

