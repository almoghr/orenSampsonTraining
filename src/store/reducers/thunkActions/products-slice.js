import axios from "axios";

import { setProducts } from "../products-slice";

export const getProducts = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const { data } = response;

    if (!data) {
      throw new Error("products array from api call is empty");
    }

    dispatch(setProducts(data));
  } catch (error) {
    console.log(error);
  }
};
