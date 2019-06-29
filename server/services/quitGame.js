export const quitGame = (id, state, payload, { updateRooms, navigate }) => {
  const me = state.value.server.users[id]
  const rooms = state.value.server.rooms.map(room => {
    const players = room.players.filter(player => player !== payload.id);
    const seatsLeft = players.length !== room.players.length ? room.seatsLeft+1 : room.seatsLeft
    return {...room, players, seatsLeft}
  });

  return {
    otherActions: [
      () => updateRooms(rooms),
      () => updateRooms.epic(),
      () => navigate({socket: me.socket, data: '/rooms/'})
    ]
  };
}