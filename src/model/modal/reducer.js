import { handleActions } from "utils";

import {
  openModal,
  closeModal,
} from "./actions";

const reducerName = "modal";

const initialState = {
  isOpen: false,
  action: '',
  content: '',
};

const reducer = handleActions(
  {
    [openModal.type]: (state, { payload }) => ({
      isOpen: true,
      action: payload.action,
      content: payload.content,
    }),
    [closeModal.type]: (state, { payload }) => ({
      isOpen: false,
      action: '',
      content: '',
    }),
  },
  initialState,
  reducerName
);

export { reducerName, reducer };
