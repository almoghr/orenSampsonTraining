export const UNCHANGED = "unchanged";

//Startup
export const STARTUP = "startup";

// Products
export const PRODUCTS_GET = "PRODUCTS_GET";
export const PRODUCTS_GET_REQUESTED = "products_getProducts_requested";
export const PRODUCTS_GET_SUCCESS = "products_getProducts_success";
export const PRODUCTS_GET_FAILURE = "products_getProducts_failure";
export const PRODUCTS_RESET_STATE = "products_reset_state";

// Pagination
export const PAGINATION_INCREMENT = "pagination_increment";
export const PAGINATION_DECREMENT = "pagination_decrement";
export const PAGINATION_NEW_STATE = "pagination_init_state";
export const PAGINATION_RESET_STATE = "pagination_reset_state";

// Categories
export const CATEGORIES_GET = "categories_getCategories";
export const CATEGORIES_GET_REQUESTED = "categories_getCategories_requested";
export const CATEGORIES_GET_SUCCESS = "categories_getCategories_success";
export const CATEGORIES_GET_FAILURE = "categories_getCategories_failure";

// Auth
export const AUTH_LOGIN_SIGNUP = "auth_login_signup";
export const AUTH_REQUESTED = "auth_requested";
export const AUTH_LOGIN_SUCCESS = "auth_login_success";
export const AUTH_SIGNUP_SUCCESS = "auth_signup_success";
export const AUTH_FAILURE = "auth_failure";
export const AUTH_LOGOUT = "auth_logout";
export const AUTH_RESET_STATE = "auth_reset_state";

// Cart
export const CART_DISCOUNTS_SETTER = "cart_discounts_setter";
export const CART_ISDISCOUNTAPPLIED_SETTER = "cart_isDiscountApplied_setter";
export const CART_PRODUCTS_SETTER = "cart_products_setter";
export const CART_TOTALPRICE_BEFORE_DISCOUNT_SETTER =
  "cart_totalPrice_before_discount_setter";
export const CART_TOTALPRICE_AFTER_DISCOUNT_SETTER =
  "cart_totalPrice_after_discount_setter";
export const CART_ADD_REMOVE_PRODUCT = "cart_add_remove_product";
export const CART_SEND_TRANSACTION = "cart_send_transaction";
export const CART_SEND_TRANSACTION_REQUESTED =
  "cart_send_transaction_requested";
export const CART_SEND_TRANSACTION_SUCCESS = "cart_send_transaction_success";
export const CART_SEND_TRANSACTION_FAILURE = "cart_send_transaction_failure";
export const CART_RESET_STATE = "cart_reset_state";
