import io from 'socket.io-client';

import { store } from './store';

const socket = io.connect('http://localhost:8000')

let canDispatchAction = true;

socket.on('server-response', (payload) => {
  clearTimeout(window.connectionTimeout)
  store.dispatch(payload)
})

socket.on('connect_error', (payload) => {
  if(canDispatchAction){
    store.dispatch({type: 'CONNECTION_ERROR'})
  }
  canDispatchAction = false;
})

socket.on('reconnect', (payload) => {
  canDispatchAction = true;
})


export { socket };