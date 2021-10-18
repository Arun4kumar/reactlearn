import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/store";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartButtonHandler = () => {
    dispatch(uiActions.toggle());
  };
  const { count } = useSelector((state) => state.cart);
  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{count}</span>
    </button>
  );
};

export default CartButton;
