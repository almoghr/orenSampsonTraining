import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import ProductsManager from "./components/ProductsManager/ProductsManager";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className={styles.App}>
      <h1>shopApp</h1>
      <Header></Header>
      <ProductsManager></ProductsManager>
      <Footer></Footer>
    </div>
  );
};

export default App;
