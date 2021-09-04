import * as types from "./types";
import { PRODUCTS_PER_PAGE } from "../constants/pagination";

export const increment_pagination = (payload) => {
  const completeArray = payload.completeArray;
  const amount = payload.amount;
  const stateCurrentPage = payload.currentPage;

  const minLength = (stateCurrentPage + amount - 1) * PRODUCTS_PER_PAGE;
  if (!(minLength < completeArray.length)) {
    return { type: types.UNCHANGED };
  }

  const currentPage = stateCurrentPage + amount;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = currentPage * PRODUCTS_PER_PAGE;

  let isLastPage = false;
  if (startIndex < completeArray.length && endIndex >= completeArray.length) {
    isLastPage = true;
  }

  const paginatedArr = completeArray.slice(startIndex, endIndex);

  return {
    type: types.PAGINATION_INCREMENT,
    payload: {
      currentPage,
      isLastPage,
      paginatedArr,
    },
  };
};

export const decrement_pagination = (payload) => {
  const completeArray = payload.completeArray;
  const amount = payload.amount;
  const stateCurrentPage = payload.currentPage;

  if (stateCurrentPage - amount < 1) {
    return { type: types.UNCHANGED };
  }

  const currentPage = stateCurrentPage - amount;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = currentPage * PRODUCTS_PER_PAGE;

  let isLastPage = false;

  const paginatedArr = completeArray.slice(startIndex, endIndex);

  return {
    type: types.PAGINATION_DECREMENT,
    payload: {
      currentPage,
      isLastPage,
      paginatedArr,
    },
  };
};

export const new_state_pagination = (payload) => {
  const completeArray = payload.completeArray;

  const startIndex = 0;
  const endIndex = PRODUCTS_PER_PAGE;
  const paginatedArr = completeArray.slice(startIndex, endIndex);

  let isLastPage = false;
  if (startIndex < completeArray.length && endIndex >= completeArray.length) {
    isLastPage = true;
  }

  const totalPages =
    completeArray.length % PRODUCTS_PER_PAGE > 0
      ? Math.floor(completeArray.length / PRODUCTS_PER_PAGE) + 1
      : Math.floor(completeArray.length / PRODUCTS_PER_PAGE);

  return {
    type: types.PAGINATION_NEW_STATE,
    payload: { totalPages, isLastPage, paginatedArr },
  };
};

export const reset_state_pagination = () => {
  return {
    type: types.PAGINATION_RESET_STATE,
  };
};
