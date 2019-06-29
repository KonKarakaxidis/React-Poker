import { handleActions } from "utils";

import {
  showSpinner,
  hideSpinner,
} from "./actions";

const reducerName = "spinner";

const initialState = {
  isVisible: true,
};

const reducer = handleActions(
  {
    [showSpinner.type]: (state, { payload }) => ({
      isVisible: true,
    }),
    [hideSpinner.type]: (state, { payload }) => ({
      isVisible: false,
    }),
  },
  initialState,
  reducerName
);

export { reducerName, reducer };
