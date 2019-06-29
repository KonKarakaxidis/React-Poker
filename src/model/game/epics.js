import { ofType } from "redux-observable";
import { map, mergeMap, concatMap } from "rxjs/operators";
import { push } from 'connected-react-router'
import { request } from "utils";

import {
  dealCards,
  updatePlayer,
  updateGameVisibility,
  pickCard,
  exchangeCards,
  exchangeCardsOpponent,
  updateOpponent,
  updateCardsVisibility,
  updateRooms,
  fetchRooms,
  quitGame,
  navigate,
} from "./actions";

const requestEpic = action =>
  action.pipe(
    ofType(
      updateRooms.epic.type,
      dealCards.type,
      exchangeCards.type,
      fetchRooms.type,
      quitGame.type,
    ),
    request()
  )

const pickCardEpic = (action, state) =>
  action.pipe(
    ofType(pickCard.type),
    map(({ payload }) => {
      const cards = state.value.game.players[0].cards.map(card =>
        card.id === payload
          ? { ...card, isPicked: !card.isPicked }
          : { ...card }
      );

      return updatePlayer({
        ...state.value.game.players[0],
        cards
      });
    })
  );

const dealCardsSuccessEpic = action =>
  action.pipe(
    ofType(dealCards.success.type),
    concatMap(({ payload }) => [
      updatePlayer({
        ...payload.player,
        cards: payload.player.cards.map((card, id) => ({
          ...card,
          id,
          isPicked: false
        }))
      }),
      updateGameVisibility({
        isEvaluateVisible: true,
        isEvaluateEnabled: true,
        isDealVisible: false,
      }),
      navigate('/table/'),
    ])
  );

const exchangeCardsSuccessEpic = action =>
  action.pipe(
    ofType(exchangeCards.success.type),
    map(({ payload }) => {
      return updatePlayer({
        ...payload.player,
        hasNewCards: true,
        cards: payload.player.cards.map((card, id) => ({
          ...card,
          id,
          isPicked: false
        })),
      });
    })
  );


const updateRoomSuccessEpic = action =>
  action.pipe(
    ofType(updateRooms.success.type),
    map(({ payload }) => updateRooms(payload.rooms))
  );

const fetchRoomsSuccessEpic = (action, state) =>
  action.pipe(
    ofType(fetchRooms.success.type),
    map(({ payload }) => updateRooms(payload.rooms)),
  )

const navigateEpic = action =>
  action.pipe(
    ofType(navigate.type),
    map(({ payload }) => push(payload)),
  )

const exchangeCardsOpponentListener = action =>
  action.pipe(
    ofType(exchangeCardsOpponent.type),
    mergeMap(({ payload }) => [
      updateOpponent({
        ...payload,
        cards: payload.cards.map((card, id) => ({
          ...card,
          id,
          isPicked: false
        }))
      }),
      updateCardsVisibility({ isFrontSideVisible: true }),
      updateGameVisibility({ isScoreVisible: true })
    ])
  );

export const epics = [
  requestEpic,
  pickCardEpic,
  dealCardsSuccessEpic,
  exchangeCardsSuccessEpic,
  updateRoomSuccessEpic,
  fetchRoomsSuccessEpic,
  navigateEpic,
  exchangeCardsOpponentListener,
];
