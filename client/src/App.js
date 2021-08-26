import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { startup } from "./store/actions/startupActions";

import styles from "./App.module.scss";
import Layout from "./components/Layout/Layout";

const AllProductsPage = React.lazy(() =>
  import("./pages/AllProductsPage/AllProductsPage")
);
const CategoryProductsPage = React.lazy(() =>
  import("./pages/CategoryProductsPage/CategoryProductsPage")
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const AuthPage = React.lazy(() => import("./pages/AuthPage/AuthPage"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startup());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Layout>
          <Suspense fallback={<ClipLoader loading={true} size={150} />}>
            <Switch>
              <Route exact path="/">
                <AllProductsPage />
              </Route>
              <Route path="/categories/:category">
                <CategoryProductsPage />
              </Route>
              <Route path="/auth">
                <AuthPage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
