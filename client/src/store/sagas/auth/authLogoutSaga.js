import { TOKEN_NAME } from "../../constants/auth";

export function* authLogoutHandler(action) {
  yield localStorage.removeItem(TOKEN_NAME);
}
