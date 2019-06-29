
import { pipe } from 'rxjs'
import { tap, ignoreElements } from 'rxjs/operators'
import { timeout, socket } from 'utils'

export const request = () => 
  pipe(
    tap(action => socket.emit('client-request', action)),
    tap(() => {
      clearTimeout(window.connectionTimeout);
      window.connectionTimeout = timeout([{type: 'CONNECTION_TIMEOUT'}]);
    }),
    ignoreElements()
  )

