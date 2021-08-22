import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducers from "./reducers/productsReducers";
import paginationReducers from "./reducers/paginationReducers";
import categoriesReducers from "./reducers/categoriesReducers";
import authReducers from "./reducers/authReducers";
import { watcherSaga } from "./rootSaga";

const reducers = combineReducers({
  productsReducers,
  paginationReducers,
  categoriesReducers,
  authReducers,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(watcherSaga);

export default store;
