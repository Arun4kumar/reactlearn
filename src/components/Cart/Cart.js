import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.title}
            item={{ ...item, total: item.quantity * item.price }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
