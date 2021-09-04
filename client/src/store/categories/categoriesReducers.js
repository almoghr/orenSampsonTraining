import * as types from "./types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const getImmutableState = (state) => {
  const newState = { ...state };

  if (state.categories?.length) {
    newState.categories = [...state.categories];
  }

  return newState;
};

const reducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CATEGORIES_GET_REQUESTED:
      return {
        ...getImmutableState(state),
        isLoading: true,
      };

    case types.CATEGORIES_GET_SUCCESS:
      return {
        ...getImmutableState(state),
        isLoading: false,
        categories: action.payload,
      };

    case types.CATEGORIES_GET_FAILURE:
      return {
        ...getImmutableState(state),
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...getImmutableState(state) };
  }
};

export default reducer;
