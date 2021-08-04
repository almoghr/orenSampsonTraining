import * as types from "../types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  loading: false,
  error: null,
};

const reducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case types.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
