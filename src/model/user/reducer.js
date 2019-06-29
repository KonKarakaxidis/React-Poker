import { handleActions } from "utils";

import {
  updateClient,
  updateUser,
} from "./actions";

const reducerName = "user";

const initialState = {

};

const reducer = handleActions(
  {
    [updateClient.type]: (state, { payload }) => ({
      id: payload
    }),
    [updateUser.type]: (state, { payload }) => ({
      ...state,
      ...payload,
    })
  },
  initialState,
  reducerName
);

export { reducerName, reducer };
