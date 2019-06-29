import { Deck } from "../logic";

let roomId = 0;

const addRoom = (id, state, payload, { updateRooms }) => {
  const newRoom = {
    roomId,
    roomName: payload.roomName,
    creator: payload.creator,
    creatorId: id,
    seatsLeft: 2,
    players: [],
    deck: new Deck()
  };
  const { deck, ...rest } = newRoom;
  const rooms = [...state.value.server.rooms, rest];
  roomId++;
  return {
    payload: { rooms },
    otherActions: [
      () => updateRooms([...state.value.server.rooms, newRoom])
    ]
  };
}

const deleteRoom = (id, state, payload, { updateRooms }) => {
  const rooms = state.value.server.rooms;
  const roomsAfterDeletion = rooms.filter(
    room => room.roomId !== payload.roomId
  ).map(room => {
    const {deck, ...rest} = room;
    return rest;
  });

  return {
    payload: { rooms: roomsAfterDeletion },
    otherActions: [() => updateRooms(roomsAfterDeletion)]
  };
}

export const updateRooms = (id, state, payload, { updateRooms }) => {
  switch (payload.type) {
    case "ADD":
      return addRoom(id, state, payload, { updateRooms })

    case "DELETE":
      return deleteRoom(id, state, payload, { updateRooms })

    default:
      const rooms = state.value.server.rooms;
      const roomsWithoutDeck = rooms.map(room => {
        const {deck, players, ...rest} = room;
        return rest;
      })
      return {
        payload: { rooms: roomsWithoutDeck },
      };
  }
};
