import { combineReducers, createStore } from "redux";

import productsSlice from "./reducers/products-slice";

const reducers = combineReducers({ productsSlice: productsSlice });

const store = createStore(reducers);

export default store;

//await axios.get("https://fakestoreapi.com/products");
