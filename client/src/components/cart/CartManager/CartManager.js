import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as cartActions from "../../../store/cart/actions";
import Products from "../../products/Products/Products";
import * as messages from "../../../store/constants/messages";

function CartManager() {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cartReducers.products);

  const totalPriceBeforeDiscount = useSelector(
    (state) => state.cartReducers.totalPriceBeforeDiscount
  );

  const totalPriceAfterDiscount = useSelector(
    (state) => state.cartReducers.totalPriceAfterDiscount
  );

  const isDiscountApplied = useSelector(
    (state) => state.cartReducers.isDiscountApplied
  );

  const isLoggedin = useSelector((state) => state.authReducers.isLoggedin);

  const DiscountAppliedRelatedElements = (
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
    dispatch(cartActions.cart_send_transaction());
  };

  const clearCartHandler = () => {
    dispatch(cartActions.cart_clear_cart());
  };

  return (
    <div>
      {!cartProducts?.length ? (
        "Cart Is Empty"
      ) : (
        <Fragment>
          <Products
            products={cartProducts}
            showAddToCartBtn={false}
            isCart={true}
          />
          {isDiscountApplied && DiscountAppliedRelatedElements}
          {!isDiscountApplied && (
            <h3>Total Price: {totalPriceBeforeDiscount}</h3>
          )}
          {isLoggedin ? (
            <div>
              <button onClick={sendTransactionHandler}>
                Submit Transaction
              </button>
            </div>
          ) : (
            messages.NOT_LOGGED_IN_TRANSACTION
          )}
          <div>
            <button onClick={clearCartHandler}>Clear Cart</button>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default CartManager;
