import clone from "lodash.clonedeep";

import * as types from "./types";

const PAGINATION_INITIAL_STATE = {
  currentPage: 1,
  isLastPage: false,
  totalPages: 0,
  paginatedArr: [],
};

const reducer = (state = clone(PAGINATION_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.PAGINATION_INCREMENT:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        isLastPage: action.payload.isLastPage,
        paginatedArr: clone(action.payload.paginatedArr),
      };

    case types.PAGINATION_DECREMENT:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        isLastPage: action.payload.isLastPage,
        paginatedArr: clone(action.payload.paginatedArr),
      };

    case types.PAGINATION_NEW_STATE:
      return {
        ...state,
        currentPage: PAGINATION_INITIAL_STATE.currentPage,
        isLastPage: action.payload.isLastPage,
        totalPages: action.payload.totalPages,
        paginatedArr: clone(action.payload.paginatedArr),
      };

    case types.PAGINATION_RESET_STATE:
      return {
        ...clone(PAGINATION_INITIAL_STATE),
      };

    default:
      return { ...state };
  }
};

export default reducer;
