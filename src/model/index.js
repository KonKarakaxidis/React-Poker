import { subscribeToStore } from 'utils'

import { reducer as gameReducer, epics } from './game'

import { reducer as modalReducer } from './modal'

import { reducer as userReducer } from './user'

import { reducer as spinnerReducer } from  './spinner'

export const storeConfig = function(){
  subscribeToStore(gameReducer, epics);
  subscribeToStore(modalReducer);
  subscribeToStore(userReducer);
  subscribeToStore(spinnerReducer);
}
