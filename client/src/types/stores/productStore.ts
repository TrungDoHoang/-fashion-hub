import { TCategories } from '.';
import { STATUS_FETCH } from '../../constants';

export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: TCategoryProduct;
  rating: TRating;
  createdAt: string;
  updatedAt: string;
};

type TCategoryProduct = Pick<TCategories, 'id' | 'title' | 'slug'>;
type TRating = {
  rate: number;
  count: number;
};

export type TProductsResponse = {
  currentPage: number;
  from: number | null;
  lastPage: number;
  data: TProduct[];
  perPage: number;
  to: number | null;
  total: number;
};

export type TFetch = (typeof STATUS_FETCH)[keyof typeof STATUS_FETCH];

export type TInItState = Omit<TProductsResponse, 'data'> & {
  products: TProduct[];
  state: TFetch;
};
