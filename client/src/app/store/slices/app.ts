import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TAppInitState, TCartItem, TProduct } from '../../../types/stores';
import { useDispatch } from 'react-redux';

const initialState: TAppInitState = {
  openSidebar: false,
  cart: [],
};

const appSlice = createSlice({
  name: 'globalSate',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.openSidebar = !state.openSidebar;
    },

    addToCart: (state, action: PayloadAction<TProduct>) => {
      const newItem: TCartItem = { product: action.payload, amount: 1 };

      //   Check if item exists
      const cartItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );
      if (cartItem) {
        const newCart = state.cart.map((item) => {
          if (item.product.id === action.payload.id) {
            return { ...item, amount: item.amount + 1 };
          } else return item;
        });
        state.cart = newCart;
      } else {
        state.cart.push(newItem);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log(action.payload);

      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },

    decreaseItemCart: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((it) => it.product.id === action.payload);
      if (item) {
        if (item.amount < 2) {
          state.cart = state.cart.filter(
            (it) => it.product.id !== item.product.id
          );
        } else {
          state.cart = state.cart.map((it) => {
            if (item.product.id === it.product.id) {
              return { ...it, amount: it.amount - 1 };
            } else return it;
          });
        }
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const APP_SELECTOR = (state: RootState) => state.appStore;

export const {
  toggleSideBar,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseItemCart,
} = appSlice.actions;

export default appSlice.reducer;
