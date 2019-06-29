import { subscribeToStore } from '../main';
import { epics } from './epics';
import { reducer } from './reducer';

export const storeConfig = function(){
  subscribeToStore(reducer, epics)
}
