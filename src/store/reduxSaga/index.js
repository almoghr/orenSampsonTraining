import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import productsSlice from "../reducers/products-slice";
import { watcherSaga } from "./sagas/rootSaga";

const reducers = combineReducers({ productsSlice: productsSlice });

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
