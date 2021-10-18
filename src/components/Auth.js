import classes from "./Auth.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/store";
const Auth = () => {
  const email = useRef();
  const dispatch = useDispatch();
  const password = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email.current.value === "" || password.current.value === "") {
      return;
    }
    dispatch(authActions.login());
  };
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input ref={email} type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input ref={password} type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
