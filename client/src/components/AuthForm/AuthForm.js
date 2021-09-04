import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth_login_signup, auth_logout } from "../../store/auth/authActions";

function AuthForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducers.isLoading);
  const isLogin = useSelector((state) => state.authReducers.isLogin);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const logoutHandler = () => {
    dispatch(auth_logout());
  };

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      auth_login_signup({
        isLoginMode,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      })
    );
  };

  return (
    <div>
      <h1>{isLoginMode ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          {!isLoading && (
            <button>{isLoginMode ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
        <div>{isLogin && <button onClick={logoutHandler}>Logout</button>}</div>
        <div>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLoginMode ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
