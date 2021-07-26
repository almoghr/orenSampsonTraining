import axios from "axios";

import { productsActions } from "./products-slice";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(productsActions.setProdcuts(response.data));
    } catch (e) {
      console.log(e);
      
    }
    
  };
};
