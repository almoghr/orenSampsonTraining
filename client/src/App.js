import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./App.module.scss";
import Layout from "./components/Layout/Layout";

const ProductsManager = React.lazy(() =>
  import("./pages/ProductsManager/ProductsManager")
);
const CategoryProducts = React.lazy(() =>
  import("./pages/CategoryProducts/CategoryProducts")
);
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Layout>
          <Suspense fallback={<ClipLoader loading={true} size={150} />}>
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
          </Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
