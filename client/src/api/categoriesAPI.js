import axios from "axios";

import { API_CALL_FAILED } from "../store/constants/messages";

export const requestGetCategories = async () => {
  let fetchedData;
  try {
    fetchedData = await axios.get(
      "http://localhost:8080/api/categories/getcategories"
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || API_CALL_FAILED);
  }

  return fetchedData;
};
