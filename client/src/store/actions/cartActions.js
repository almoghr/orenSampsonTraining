import * as types from "../types";

export const cart_add_remove_product = (payload) => ({
  type: types.CART_ADD_REMOVE_PRODUCT,
  payload,
});

export const cart_discounts_setter = (payload) => {
  const discounts = [];
  for (const discount of payload) {
    discounts.push({ ...discount });
  }

  return { type: types.CART_DISCOUNTS_SETTER, discounts };
};

export const cart_isDiscountApplied_setter = (payload) => {
  return {
    type: types.CART_ISDISCOUNTAPPLIED_SETTER,
    isDiscountApplied: payload,
  };
};

export const cart_products_setter = (payload) => {
  const cartProducts = [];
  for (const cartProduct of payload) {
    cartProducts.push({ ...cartProduct });
  }

  return { type: types.CART_PRODUCTS_SETTER, cartProducts };
};

export const cart_totalPrice_setter = (payload) => ({
  type: types.CART_TOTALPRICE_SETTER,
  totalPrice: payload,
});
