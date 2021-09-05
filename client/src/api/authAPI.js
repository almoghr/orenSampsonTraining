import axios from "axios";
import { toast } from "react-toastify";

import { API_CALL_FAILED } from "../store/constants/messages";
import { TOKEN_NAME } from "../store/constants/auth";

export const requestAuth = async (payload) => {
  let response;
  try {
    if (!payload.isLoginMode) {
      response = await axios.put("http://localhost:8080/api/auth/signup", {
        email: payload.email,
        password: payload.password,
      });
    } else {
      response = await axios.post("http://localhost:8080/api/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      if (!response) {
        throw new Error(API_CALL_FAILED);
      }

      const { token } = response.data;

      localStorage.setItem(TOKEN_NAME, token);
    }

    toast(response?.data?.message);
  } catch (error) {
    throw new Error(
      error.message || error.response?.data?.message || API_CALL_FAILED
    );
  }
};
