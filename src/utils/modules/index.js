

import configureStore from './create-store';

import { request } from './custom-rxjs-operators';

import { connect, handleActions, createNamespaceAction, createNamespaceProp } from './utils';

export {
  request,
  connect,
  configureStore, 
  handleActions,
  createNamespaceAction,
  createNamespaceProp,
};
