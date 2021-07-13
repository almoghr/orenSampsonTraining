import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className={styles.App}>
      <h1>App</h1>
      <Header></Header>
      <Products></Products>
    </div>
  );
}

export default App;
