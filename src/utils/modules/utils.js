import { createAction, handleActions } from 'redux-actions';

import { connect } from 'react-redux';

const STATE = 'STATE';
const DISPATCH = 'DISPATCH';

const actionProp = mapDispatchToProps => {
  mapDispatchToProps.type = DISPATCH;
  return mapDispatchToProps;
};

const action = namespace => type => {
  const action = createAction(`${namespace}/${type}`);
  action.type = `${namespace}/${type}`;

  action.epic = createAction(`EPIC//${namespace}/${type}`);
  action.epic.type = `EPIC//${namespace}/${type}`;

  action.success = createAction(`${namespace}/${type}_SUCCESS`);
  action.success.type = `${namespace}/${type}_SUCCESS`;

  action.failure = createAction(`${namespace}/${type}_FAILURE`);
  action.failure.type = `${namespace}/${type}_FAILURE`;

  action.dispatch = (key) => actionProp(dispatch => {
    const func = payload => dispatch(action(payload));
    func.epic = payload => dispatch(action.epic(payload));
    return {
      [key]: func
    }
  })
  
  return action;
};

const stateProp = mapStateToProps => {
  mapStateToProps.type = STATE;
  return mapStateToProps;
};

const prop = reducerName => pathToValue => {
  const getProperty = (array = [], stateTree, reducerName) => (
    array.reduce(
      (acc,cur) => ({value: acc.value[cur]}),
      {value: stateTree[reducerName]}
    ).value
  );

  return (key) => stateProp((stateTree) => ({
    [key]: getProperty(pathToValue, stateTree, reducerName)
  }))
}

const hActions = (actions, initialState, name) => {
  const reducer = handleActions(actions,initialState);
  reducer.reducerName = name;
  return reducer;
}

const combineMaps = (propsType, propsMaps) => {
  return (stateOrDispatch) => {
    return propsMaps
      .filter(map => map.type === propsType)
      .reduce((props, map) => {
        return {...props,...map(stateOrDispatch)}
      }, {});
  }
}

const connectProps = (propsMaps) => {
  const props = Object.entries(propsMaps).map(([key,value]) => value.dispatch ? value.dispatch(key) : value(key))
  return connect(
    combineMaps(STATE, props),
    combineMaps(DISPATCH, props)
  )
};

export {
  connectProps as connect,
  hActions as handleActions,
  action as createNamespaceAction,
  prop as createNamespaceProp,
};
