import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import { watcherSaga } from "./rootSaga";
import authReducers from "./auth/reducers";
import categoriesReducers from "./categories/categoriesReducers";
import paginationReducers from "./pagination/paginationReducers";
import productsReducers from "./products/productsReducers";
import cartReducers from "./cart/cartReducers";

export const history = createBrowserHistory();

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    authReducers,
    categoriesReducers,
    paginationReducers,
    productsReducers,
    cartReducers,
  });

export default function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(watcherSaga);

  return store;
}
