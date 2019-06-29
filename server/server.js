import { v1 as uuid} from 'uuid'
import { socket, store, io } from './main';

import { updateUser, deleteUser, updateClient } from './model/actions';

import { storeConfig } from './model';

storeConfig();

socket.subscribe(
  client => {
    const id = uuid();
    console.log('Connected user with id: ' + id);

    store.dispatch(updateUser({id, socket: client}));

    client.emit('server-response', updateClient(id))

    client.on('client-request', ({ type, payload }) => {
      console.log(`
      INCOMING ACTION----------------------->
      TYPE: ${type}
      PAYLOAD: ${JSON.stringify(payload, null, " ")}`)
      store.dispatch({ type, socket: client, payload, id, io })
    })

    client.on('disconnect', () => {
      store.dispatch(deleteUser.epic({ id }));
    })
  }  
)
