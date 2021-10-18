import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  count: 0,
};

const initialUIState = {
  cartVisible: false,
  loading: false,
  error: null,
};

const UI = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    toggle: (state) => {
      state.cartVisible = !state.cartVisible;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
  },
});

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { title, quantity, price } = action.payload;
      const exist = state.items.find((item) => item.title === title);
      if (exist) {
        exist.quantity++;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount += quantity * price;
      state.count += quantity;
    },
    remove: (state, action) => {
      const { title, quantity, price } = action.payload;
      const exist = state.items.find((item) => item.title === title);
      if (exist.quantity === 1) {
        state.items = state.items.filter((item) => item.title !== title);
      } else {
        exist.quantity -= 1;
      }
      state.totalAmount -= quantity * price;
      state.count -= quantity;
    },
    replace: (state, action) => {
      const { items, count, totalAmount } = action.payload;
      state.items = items ? items : [];
      state.count = count ? count : 0;
      state.totalAmount = totalAmount ? totalAmount : 0;
    },
  },
});

const cartPost = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.loading(true));
    const sendRequest = async () => {
      const response = await fetch(
        "https://cart-f5b38-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request Failed...");
      }
    };
    try {
      await sendRequest();
      dispatch(uiActions.loading(false));
      dispatch(uiActions.error(null));
    } catch (error) {
      dispatch(uiActions.loading(false));
      dispatch(uiActions.error(error.message));
    }
  };
};

const cartFetch = () => {
  return async (dispatch) => {
    dispatch(uiActions.loading(true));
    const sendRequest = async () => {
      const response = await fetch(
        "https://cart-f5b38-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Request Failed...");
      }

      const cartData = await response.json();
      dispatch(cartActions.replace(cartData));
    };
    try {
      await sendRequest();
      dispatch(uiActions.loading(false));
      dispatch(uiActions.error(null));
    } catch (error) {
      dispatch(uiActions.loading(false));
      dispatch(uiActions.error(error.message));
    }
  };
};

export { cartPost, cartFetch };
export const cartActions = cart.actions;
export const uiActions = UI.actions;
const store = configureStore({
  reducer: { cart: cart.reducer, ui: UI.reducer },
});
export default store;
