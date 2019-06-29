import { createNamespaceAction } from 'utils';

const createAction = createNamespaceAction('GAME');


export const dealCards = createAction('DEAL_CARDS');

export const exchangeCards = createAction('EXCHANGE_CARDS');

export const exchangeCardsOpponent = createAction('EXCHANGE_CARDS_OPPONENT');

export const pickCard = createAction('PICK_CARD');

export const updatePlayer = createAction('UPDATE_PLAYER');

export const updateGameVisibility = createAction('UPDATE_GAME_VISIBILITY');

export const updateCardsVisibility = createAction('UPDATE_CARDS_VISIBILITY');

export const updateOpponent = createAction('UPDATE_OPPONENT');

export const quitGame = createAction('QUIT_GAME');
// ROOMS

export const updateRooms = createAction('UPDATE_ROOMS');

export const fetchRooms = createAction('FETCH_ROOMS');

export const navigate = createAction('NAVIGATE');


