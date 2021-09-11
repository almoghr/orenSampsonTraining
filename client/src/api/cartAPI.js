import axios from "axios";

import { AUTH_HEADER_NAME } from "../store/constants/auth";
import { API_CALL_FAILED } from "../store/constants/messages";

export const requestsendTransaction = async (payload, token) => {
  try {
    const headers = {
      [AUTH_HEADER_NAME]: `Bearer ${token}`,
    };

    await axios.post(
      "http://localhost:8080/api/transactions/addtransaction",
      payload,
      {
        headers,
      }
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || API_CALL_FAILED);
  }
};
