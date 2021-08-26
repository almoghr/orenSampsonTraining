import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "./reducers/index";
import { watcherSaga } from "./rootSaga";

export const history = createBrowserHistory();

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

  // // Hot reloading
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept("./reducers/index", () => {
  //     store.replaceReducer(createRootReducer(history));
  //   });
  // }

  sagaMiddleware.run(watcherSaga);

  return store;
}
