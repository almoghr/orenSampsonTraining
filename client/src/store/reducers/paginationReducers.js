import * as types from "../types";

const PAGINATION_INITIAL_STATE = {
  currentPage: 1,
  isLastPage: false,
  totalPages: 0,
  paginatedArr: [],
};

const reducer = (state = PAGINATION_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        isLastPage: action.payload.isLastPage,
        paginatedArr: action.payload.paginatedArr,
      };

    case types.DECREMENT:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        isLastPage: action.payload.isLastPage,
        paginatedArr: action.payload.paginatedArr,
      };

    case types.INIT_PAGINATION:
      return {
        ...state,
        currentPage: PAGINATION_INITIAL_STATE.currentPage,
        isLastPage: action.payload.isLastPage,
        totalPages: action.payload.totalPages,
        paginatedArr: action.payload.paginatedArr,
      };

    default:
      return { ...state };
  }
};

export default reducer;
