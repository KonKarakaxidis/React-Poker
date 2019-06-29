import { configureStore } from './modules';

const { store, subscribeToStore, history } = configureStore();

const timeout = (actions = [], time = 10000) => {
  return setTimeout(() => actions && actions.forEach(action => store.dispatch(action)), time)
}

export {
  store, 
  subscribeToStore,
  timeout,
  history,
}