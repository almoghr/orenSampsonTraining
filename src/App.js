import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import styles from "./App.module.scss";
import store from "./store/index";
import Layout from "./components/Layout/Layout";
import ProductsManager from "./pages/ProductsManager/ProductsManager";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.App}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <ProductsManager />
              </Route>
              <Route path="/categories/:category">
                <CategoryProducts />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
