import * as types from "./types";

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
