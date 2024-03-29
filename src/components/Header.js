import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/store";
import classes from "./Header.module.css";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          {isAuth && (
            <>
              <li>
                <a href="/">My Products</a>
              </li>
              <li>
                <a href="/">My Sales</a>
              </li>
              <li>
                <button onClick={() => dispatch(authActions.logout())}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
