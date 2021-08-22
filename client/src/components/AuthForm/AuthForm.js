import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../store/actions/authActions";

function AuthForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducers.isLoading);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      auth({
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
