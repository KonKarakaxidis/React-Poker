import { handleActions } from "../modules";

import {
  updateUser,
  updateRooms,
  deleteUser,
} from "./actions";

const reducerName = "server";

const initialState = {
  users: {
  },
  rooms: [],
  deck: [],
};

const reducer = handleActions(
  {
    [updateRooms.type]: (state, { payload }) => ({
      ...state,
      rooms: payload
    }),
    [updateUser.type]: (state, { payload }) => ({
      ...state,
      users: {
        ...state.users,
        [payload.id]: {
          ...state.users[payload.id],
          ...payload
        }
      }
    }),
    [deleteUser.type]: (state, { payload }) => ({
      ...state,
      users: payload,
    }),
  },
  initialState,
  reducerName
);

export { reducerName, reducer };

