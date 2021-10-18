import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Loader from "./components/UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import { cartFetch, cartPost } from "./store/store";
import Error from "./components/UI/Error";
var initial = true;

function App() {
  const { cartVisible, loading, error } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (initial) {
      dispatch(cartFetch());
      initial = false;
      return;
    }

    dispatch(cartPost(cart));
  }, [cart, dispatch]);
  return (
    <Layout>
      {error && <Error message={error} />}
      {loading && <Loader />}
      {cartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
