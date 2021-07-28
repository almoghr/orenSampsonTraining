import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import productsSlice from "../reducers/products-slice";
import paginationSlice from "../reducers/pagination-slice";
import { watcherSaga } from "./sagas/rootSaga";

const reducers = combineReducers({ productsSlice, paginationSlice });

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(watcherSaga);

export default store;
