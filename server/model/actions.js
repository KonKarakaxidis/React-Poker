import { createNamespaceAction } from '../modules';

const createAction = createNamespaceAction('GAME');

export const updateClient = createNamespaceAction('')('UPDATE_CLIENT');

export const updateUser = createAction('UPDATE_USER');

export const deleteUser = createAction('DELETE_USER');

export const updateRooms = createAction('UPDATE_ROOMS');

export const fetchRooms = createAction('FETCH_ROOMS');

export const dealCards = createAction('DEAL_CARDS');

export const exchangeCards = createAction('EXCHANGE_CARDS');

export const exchangeCardsOpponent = createAction('EXCHANGE_CARDS_OPPONENT');

export const quitGame = createAction('QUIT_GAME');

export const navigate = createAction('NAVIGATE');


