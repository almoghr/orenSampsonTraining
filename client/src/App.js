import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "./App.module.scss";
import Layout from "./components/Layout/Layout";

const AllProductsViewer = React.lazy(() =>
  import("./pages/AllProductsViewer/AllProductsViewer")
);
const CategoryProductsViewer = React.lazy(() =>
  import("./pages/CategoryProductsViewer/CategoryProductsViewer")
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
                <AllProductsViewer />
              </Route>
              <Route path="/categories/:category">
                <CategoryProductsViewer />
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
