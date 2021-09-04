import { TOKEN_NAME } from "../constants/auth";

export function* authLogoutHandler() {
  yield localStorage.removeItem(TOKEN_NAME);
}
