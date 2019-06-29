import { Player } from '../logic'

export const dealCards = (id, state, payload, { updateUser, updateRooms, fetchRooms }) => {
  const room = state.value.server.rooms.find((room) => room.roomId === payload.roomId);
  const otherRooms = state.value.server.rooms.filter((room) => room.roomId !== payload.roomId);

  const updatedRoom = {
    ...room, 
    players: [...(room.players || []), id],
    seatsLeft: room.seatsLeft - 1,
  };
  
  const player =  new Player('kon', room.deck.deal());
  
  return {
    payload : { player },
    otherActions: [
      () => updateUser({id, player}),
      () => updateRooms([...otherRooms, updatedRoom]),
      () => updateRooms.epic(),
    ]
  };
}