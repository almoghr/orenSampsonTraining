import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ClipLoader from "react-spinners/ClipLoader";

import * as cartActions from "../../../store/cart/actions";
import CartProducts from "../CartProducts/CartProducts";
import * as messages from "../../../store/constants/messages";

function CartManager() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartReducers.products);
  const discounts = useSelector((state) => state.cartReducers.discounts);
  const totalPriceBeforeDiscount = useSelector(
    (state) => state.cartReducers.totalPriceBeforeDiscount
  );
  const totalPriceAfterDiscount = useSelector(
    (state) => state.cartReducers.totalPriceAfterDiscount
  );
  const isDiscountApplied = useSelector(
    (state) => state.cartReducers.isDiscountApplied
  );
  const products = useSelector((state) => state.productsReducers.products);
  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const discountAppliedRelatedElements = (
    <Fragment>
      <h3>Discount Apllied!!</h3>
      <h3>Price Before Discount: {totalPriceBeforeDiscount}</h3>
      <h3>Price After Discount: {totalPriceAfterDiscount}</h3>
      <h3>
        You Saved{" "}
        {(totalPriceBeforeDiscount - totalPriceAfterDiscount).toFixed(2)}$
      </h3>
    </Fragment>
  );

  const sendTransactionHandler = () => {
    dispatch(
      cartActions.cart_send_transaction({
        productsAndAmountArr: cartProducts,
        discountID: isDiscountApplied ? discounts[0].id : null,
      })
    );
  };

  return (
    <div>
      {totalPriceBeforeDiscount === 0 ? (
        "Cart Is Empty"
      ) : (
        <Fragment>
          <CartProducts products={products} cartProducts={cartProducts} />
          {isDiscountApplied && discountAppliedRelatedElements}
          {!isDiscountApplied && (
            <h3>Total Price: {totalPriceBeforeDiscount}</h3>
          )}
          {isLoggedin ? (
            <button onClick={sendTransactionHandler}>Submit Transaction</button>
          ) : (
            messages.NOT_LOGGED_IN_TRANSACTION
          )}
        </Fragment>
      )}
    </div>
  );
}

export default CartManager;
