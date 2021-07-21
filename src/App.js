import styles from "./App.module.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductsManager from "./components/products/ProductsManager/ProductsManager";
import Footer from "./components/Footer/Footer";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductsManager} />
          <Route path="/categories/electronics" component={CategoryProducts} />
          <Route path="/categories/jewellery" component={CategoryProducts} />
          <Route path="/categories/mensClothing" component={CategoryProducts} />
          <Route
            path="/categories/womensClothing"
            component={CategoryProducts}
          />
          {/* create a 404 page */}
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
