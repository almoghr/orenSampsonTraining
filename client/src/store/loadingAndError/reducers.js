import clone from "lodash.clonedeep";

import * as types from "./types";

export const LOADINGANDERROR_INITIAL_STATE = {
  isLoading: false,
  error: null,
};

const reducer = (state = clone(LOADINGANDERROR_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.LOADINGANDERROR_ISLOADING_SETTER:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.LOADINGANDERROR_ERROR_SETTER:
      return {
        ...state,
        error: action.payload,
      };

    case types.LOADINGANDERROR_RESET_STATE:
      return {
        ...clone(LOADINGANDERROR_INITIAL_STATE),
      };

    default:
      return { ...state };
  }
};

export default reducer;
