import CartProduct from "../CartProduct/CartProduct";
import styles from "./CartProducts.module.scss";

const findProduct = (products, productID) =>
  products.find((product) => product.id === productID);

function CartProducts({ products, cartProducts }) {
  const RenderCartProducts = cartProducts?.map(({ id, amount }) => {
    const { title, price, image } = findProduct(products, id);

    return (
      <CartProduct
        title={title}
        amount={amount}
        price={price}
        image={image}
        key={id}
      />
    );
  });

  return <div className={styles.CartProducts}>{RenderCartProducts}</div>;
}

export default CartProducts;
