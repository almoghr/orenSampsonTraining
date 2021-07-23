import { BrowserRouter, Route, Switch } from "react-router-dom";

import styles from "./App.module.scss";
import Layout from "./components/Layout/Layout";
import ProductsManager from "./pages/ProductsManager/ProductsManager";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
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
  );
};

export default App;
