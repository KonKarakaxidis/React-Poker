export const fetchRooms = (_, state) => {
  const rooms = state.value.server.rooms;
  const roomsWithOutDeck = rooms.map((room) => {
    const {deck, ...rest} = room;
    return rest;
  })

  return {
    payload : { rooms: roomsWithOutDeck },
  };
}