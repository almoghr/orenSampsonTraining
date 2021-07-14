import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className={styles.App}>
      <h1>shopApp</h1>
      <Header></Header>
      <Products></Products>
      <Footer></Footer>
    </div>
  );
}

export default App;
