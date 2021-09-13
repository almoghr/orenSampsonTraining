import * as types from "./types";

//setters
export const cart_discounts_setter = (payload) => ({
  type: types.CART_DISCOUNTS_SETTER,
  discounts: payload,
});

export const cart_isDiscountApplied_setter = (payload) => {
  return {
    type: types.CART_ISDISCOUNTAPPLIED_SETTER,
    isDiscountApplied: payload,
  };
};

export const cart_products_setter = (payload) => ({
  type: types.CART_PRODUCTS_SETTER,
  cartProducts: payload,
});

export const cart_totalPrice_before_discount_setter = (payload) => ({
  type: types.CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER,
  totalPriceBeforeDiscount: payload,
});

export const cart_totalPrice_after_discount_setter = (payload) => ({
  type: types.CART_TOTALPRICE_AFTER_DISCOUNT_SETTER,
  totalPriceAfterDiscount: payload,
});
//end setters

export const cart_send_transaction_requested = () => ({
  type: types.CART_SEND_TRANSACTION_REQUESTED,
});

export const cart_send_transaction_success = () => ({
  type: types.CART_SEND_TRANSACTION_SUCCESS,
});

export const cart_send_transaction_failure = (payload) => ({
  type: types.CART_SEND_TRANSACTION_FAILURE,
  errorMessage: payload,
});

//saga actions
export const cart_add_remove_product = (payload) => ({
  type: types.CART_ADD_REMOVE_PRODUCT,
  payload,
});

export const cart_send_transaction = (payload) => ({
  type: types.CART_SEND_TRANSACTION,
  payload,
});

export const cart_get_discounts = () => ({
  type: types.CART_GET_DISCOUNTS,
});
