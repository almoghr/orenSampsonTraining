import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducers from "./authReducers";
import categoriesReducers from "./categoriesReducers";
import paginationReducers from "./paginationReducers";
import productsReducers from "./productsReducers";
import cartReducers from "./cartReducers";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducers,
    categoriesReducers,
    paginationReducers,
    productsReducers,
    cartReducers,
  });

export default rootReducer;
