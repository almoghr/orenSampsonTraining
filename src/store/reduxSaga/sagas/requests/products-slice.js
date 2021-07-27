import axios from "axios";

export function requestGetProducts() {
  return axios.request({
    method: "GET",
    url: "https://fakestoreapi.com/products",
  });
}
