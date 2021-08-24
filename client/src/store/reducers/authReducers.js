import * as types from "../types";

const AUTH_INITIAL_STATE = {
  isLogin: false,
  isLoading: false,
  error: null,
};

const reducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case types.AUTH_REQUESTED:
      return {
        ...state,
        isLoading: !AUTH_INITIAL_STATE.isLoading,
      };

    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLogin: !AUTH_INITIAL_STATE.isLogin,
        isLoading: AUTH_INITIAL_STATE.isLoading,
        error: AUTH_INITIAL_STATE.error,
      };

    case types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: AUTH_INITIAL_STATE.isLoading,
        error: action.payload,
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        isLogin: AUTH_INITIAL_STATE.isLogin,
      };

    case types.AUTH_RESET_STATE:
      return {
        ...AUTH_INITIAL_STATE,
      };

    default:
      return { ...state };
  }
};

export default reducer;
