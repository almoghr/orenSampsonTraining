import clone from "lodash.clonedeep";

import * as types from "./types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

const reducer = (state = clone(CATEGORIES_INITIAL_STATE), action) => {
  switch (action.type) {
    case types.CATEGORIES_CATEGORIES_SETTER:
      return {
        ...state,
        categories: clone(action.payload),
      };

    default:
      return { ...state };
  }
};

export default reducer;
