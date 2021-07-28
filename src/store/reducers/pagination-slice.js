import { PRODUCTS_PER_PAGE } from "../../constants/productsManager";

const INCREMENT = "pagination_increment";
const DECREMENT = "pagination_decrement";
const INIT_PAGINATION = "pagination_init_pagination";

const PAGINATION_SLICE_INITIAL_STATE = {
  currentPage: 1,
  isLastPage: false,
  paginatedArr: [],
  totalPages: 0,
};

export const increment = (payload) => ({
  type: INCREMENT,
  payload,
});

export const decrement = (payload) => ({
  type: DECREMENT,
  payload,
});

export const init_pagination = (payload) => ({
  type: INIT_PAGINATION,
  payload,
});

const reducer = (state = PAGINATION_SLICE_INITIAL_STATE, action) => {
  let currentPage,
    startIndex,
    endIndex,
    isLastPage,
    paginatedArr,
    completeArray,
    amount;

  switch (action.type) {
    case INCREMENT:
      completeArray = action.payload.completeArray;
      amount = action.payload.amount;

      const minLength = (state.currentPage + amount - 1) * PRODUCTS_PER_PAGE;
      if (!(minLength < completeArray.length)) {
        return { ...state };
      }

      currentPage = state.currentPage + amount;
      startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      endIndex = currentPage * PRODUCTS_PER_PAGE;

      isLastPage = false;
      if (
        startIndex < completeArray.length &&
        endIndex >= completeArray.length
      ) {
        isLastPage = true;
      }

      paginatedArr = completeArray.slice(startIndex, endIndex);

      return {
        ...state,
        currentPage,
        isLastPage,
        paginatedArr,
      };

    case DECREMENT:
      completeArray = action.payload.completeArray;
      amount = action.payload.amount;

      if (state.currentPage - amount < 1) {
        return { ...state };
      }

      currentPage = state.currentPage - amount;
      startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      endIndex = currentPage * PRODUCTS_PER_PAGE;

      isLastPage = false;

      paginatedArr = completeArray.slice(startIndex, endIndex);

      return {
        ...state,
        currentPage,
        isLastPage,
        paginatedArr,
      };

    case INIT_PAGINATION:
      completeArray = action.payload.completeArray;

      startIndex = (state.currentPage - 1) * PRODUCTS_PER_PAGE;
      endIndex = state.currentPage * PRODUCTS_PER_PAGE;
      paginatedArr = completeArray.slice(startIndex, endIndex);

      const totalPages =
        completeArray.length % PRODUCTS_PER_PAGE > 0
          ? Math.floor(completeArray.length / PRODUCTS_PER_PAGE) + 1
          : Math.floor(completeArray.length / PRODUCTS_PER_PAGE);

      return { ...state, paginatedArr, totalPages };

    default:
      return { ...state };
  }
};

export default reducer;
