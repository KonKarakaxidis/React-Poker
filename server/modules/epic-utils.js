import { combineEpics, createEpicMiddleware } from 'redux-observable';

import includes from 'lodash/includes';

import { ignoreElements } from 'rxjs/operators';

const rootEpic = action$ => action$.pipe(
  ignoreElements()
);

const getEpicMiddleware = () => {

  const epicMiddleware = createEpicMiddleware();
  
  const addEpic = store => newEpic => {
    if(!store.epics){
      store.epics = [];
    }
  
    if(!includes(store.epics, newEpic)){
      store.epics.push(newEpic);
      epicMiddleware.run(combineEpics(...store.epics));
    }
  }

  return { epicMiddleware, addEpic };

}



export {
  getEpicMiddleware,
  rootEpic,
}

 