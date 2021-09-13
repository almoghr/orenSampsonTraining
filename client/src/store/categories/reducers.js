import clone from "lodash.clonedeep";

import * as types from "./types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const reducer = (state = clone(CATEGORIES_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.CATEGORIES_GET_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case types.CATEGORIES_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: clone(action.payload),
      };

    case types.CATEGORIES_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
