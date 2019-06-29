import { Player } from "../logic";

export const exchangeCards = (id, state, payload, { updateUser, exchangeCardsOpponent }) => {
  const room = state.value.server.rooms.find(room => room.players.includes(id));
  const cards = payload.cards.map(card => card.isPicked ? room.deck.getRandomCard() : card);
  const player = new Player('kon', cards);
  const otherUser = Object.values(state.value.server.users).find(user => {
    return user.id !== id && room.players.includes(user.id) && user.hasNewCards
  });
  const me = state.value.server.users[id]

  return {
    payload: { player },
    otherActions: [
      () => updateUser({id, player, hasNewCards: true}),
      () => otherUser ? exchangeCardsOpponent({socket: otherUser.socket, data: player, isSuccessful: true}) : ({type: 'NO_ACTION'}),
      () => otherUser ? exchangeCardsOpponent({socket: me.socket, data: otherUser.player, isSuccessful: true}) : ({type: 'NO_ACTION'})
    ]
  };
}