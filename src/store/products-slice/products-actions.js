import axios from "axios";

import { productsActions } from "./products-slice";

export const fetchProducts = () => {
  return async (dispatch) => {
    let response;
    try {
      response = await axios.get("https://fakestoreapi.com/products");
    } catch (e) {
      console.log(e);
    }

    dispatch(productsActions.setProdcuts(response.data));
  };
};
