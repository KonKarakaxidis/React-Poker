import { handleActions } from "utils";

import {
  updatePlayer,
  updateGameVisibility,
  updateCardsVisibility,
  updateOpponent,
  updateRooms,
} from "./actions";

const reducerName = "game";

const initialState = {
  players: [
    {
      name: "player",
      combination: "none",
      score: "none",
      cards: [0, 0, 0, 0, 0].map((o, id) => ({
        rank: o,
        suit: o,
        weight: o,
        isPicked: false,
        id
      }))
    },
    {
      name: "oponent",
      combination: "none",
      score: "none",
      cards: [0, 0, 0, 0, 0].map((o, id) => ({
        rank: o,
        suit: o,
        weight: o,
        isPicked: false,
        id
      }))
    }
  ],
  gameVisibility: {
    isTableVisible: false, 
    isDealVisible: false, 
    isDealNextVisible: false, 
    isScoreVisible: false,
    isEvaluateVisible: false,
    isEvaluateEnabled: false
  },
  cardsVisibility: {  
    isFrontSideVisible: false,
  },
  rooms: [],
};

const reducer = handleActions(
  {
    [updatePlayer.type]: (state, { payload }) => ({
      ...state,
      players: [
        { ...payload },
        { ...state.players[1] }
      ]
    }),
    [updateOpponent.type]: (state, { payload }) => ({
      ...state,
      players: [
        { ...state.players[0] },
        { ...payload },
      ]
    }),
    [updateRooms.type]: (state, { payload }) => ({
      ...state,
      rooms: payload,
    }),
    [updateGameVisibility.type]: (state, { payload }) => ({
      ...state,
      gameVisibility: {
        ...state.gameVisibility,
        ...payload,
      }
    }),
    [updateCardsVisibility.type]: (state, { payload }) => ({
      ...state,
      cardsVisibility: {
        ...state.cardsVisibility,
        ...payload,
      }
    }),
  },
  initialState,
  reducerName
);

export { reducerName, reducer };
