
import { pipe, from } from 'rxjs'
import { io } from '../main'
import { map, tap, concatMap, mergeMap } from 'rxjs/operators'


export const runService = (service, action, state, otherActions, broadcast = false) => pipe(
  map(({ socket, payload = {}, id }) =>
    ({
      response: () => {
        try{
          return Promise.resolve(service(id, state, payload, otherActions))
        }catch(err){
          console.log(err)
          return Promise.resolve(false);
        }
      },
      action,
      socket: broadcast ? io : socket,
      id,
    }),
  ),
  mergeMap(( payload ) =>
    from(payload.response()).pipe(
      tap((data) => 
      console.log(`
      SEND ACTION<-----------------------
      TYPE: ${payload.action.success.type}
      PAYLOAD: ${JSON.stringify(data, null, " ")}`)),
      map(data => 
        data 
          ? payload.action.success({data, socket: payload.socket, isSuccessful: true, uuid: payload.id})
          : payload.action.failure({socket: payload.socket, isSuccessful: false, uuid: payload.id})
      ),
    )),
  emit(),
)

export const emit = () =>
  pipe(
    tap(({ payload: { data, socket, isSuccessful, uuid }, type }) =>
      socket.emit('server-response', {
        type,
        success: isSuccessful,
        uuid,
        payload: data.payload ? data.payload : data
      })
    ),
    concatMap(({ payload: { data }}) => {
      return data.otherActions 
        ? data.otherActions.map(action => action())
        : [{type: 'NO_ACTION'}]
    })
  )

