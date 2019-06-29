import { ofType } from 'redux-observable';
import { concatMap } from 'rxjs/operators';
import { emit, runService } from '../modules/custom-rxjs-operators'
import * as services from '../services'

import { 
  dealCards,
  exchangeCards, 
  updateUser, 
  exchangeCardsOpponent, 
  updateRooms,
  fetchRooms,
  deleteUser,
  quitGame,
  navigate,
} from './actions'

const dealCardsEpic = (action, state) => action.pipe(
  ofType(dealCards.type),
  runService(
    services.dealCards,
    dealCards,
    state,
    {
      updateUser,
      updateRooms,
    }
  ),
);

const fetchRoomsEpic = (action, state) => action.pipe(
  ofType(fetchRooms.type),
  runService(
    services.fetchRooms,
    fetchRooms,
    state,
  ),
);


const updateRoomsEpic = (action, state) => action.pipe(
  ofType(updateRooms.epic.type),
  runService(
    services.updateRooms,
    updateRooms,
    state,
    {
      updateRooms,
    },
    true
  ),
);

const quitGameEpic = (action, state) => action.pipe(
  ofType(quitGame.type),
  runService(
    services.quitGame,
    quitGame,
    state,
    {
      updateRooms,
      navigate,
    },
  ),
);


const exchangeCardsEpic = (action, state) => action.pipe(
  ofType(exchangeCards.type),
  runService(
    services.exchangeCards,
    exchangeCards,
    state,
    {
      updateUser,
      exchangeCardsOpponent
    }
  ),
);

const exchangeCardsOpponentEpic = (action, state) => action.pipe(
  ofType(exchangeCardsOpponent.type),
  emit(),
);

const navigateEpic = (action, state) => action.pipe(
  ofType(navigate.type),
  emit(),
);

const deleteUserEpic = (action, state) => action.pipe(
  ofType(
    deleteUser.epic.type,
  ),
  concatMap(({payload}) => {
    const { [payload.id] : deletedUser, ...rest } = state.value.server.users;

    const rooms = state.value.server.rooms.map(room => {
      const players = room.players.filter(player => player !== payload.id);
      const seatsLeft = players.length !== room.players.length ? room.seatsLeft+1 : room.seatsLeft
      return {...room, players, seatsLeft}
    });

    return [
      deleteUser(rest),
      updateRooms(rooms),
      updateRooms.epic(),
    ]
  })
);

export const epics = [
  dealCardsEpic,
  exchangeCardsEpic,
  exchangeCardsOpponentEpic,
  updateRoomsEpic,
  deleteUserEpic,
  fetchRoomsEpic,
  navigateEpic,
  quitGameEpic,
];
