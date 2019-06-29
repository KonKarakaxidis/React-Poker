import { createAction, handleActions } from 'redux-actions';

const action = namespace => type => {
  const action = createAction(`${namespace}/${type}`);
  action.type = `${namespace}/${type}`;

  action.epic = createAction(`EPIC//${namespace}/${type}`);
  action.epic.type = `EPIC//${namespace}/${type}`;

  action.success = createAction(`${namespace}/${type}_SUCCESS`);
  action.success.type = `${namespace}/${type}_SUCCESS`;

  action.failure = createAction(`${namespace}/${type}_FAILURE`);
  action.failure.type = `${namespace}/${type}_FAILURE`;
  
  return action;
};

const hActions = (actions, initialState, name) => {
  const reducer = handleActions(actions,initialState);
  reducer.reducerName = name;
  return reducer;
}

export {
  hActions as handleActions,
  action as createNamespaceAction,
};
