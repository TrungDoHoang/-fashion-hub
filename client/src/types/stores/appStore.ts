import { TProduct } from '.';

export type TAppInitState = {
  openSidebar: boolean;
  cart: TCartItem[];
};

export type TCartItem = {
  product: TProduct;
  amount: number;
};
