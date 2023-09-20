import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TInItState, TProduct, TProductsResponse } from '../../../types/stores';
import { productsApi } from '../../api/apis';
import { STATUS_FETCH } from '../../../constants';
import { RootState } from '..';

const initialState: TInItState = {
  products: [],
  currentPage: 1,
  from: 0,
  to: 0,
  lastPage: 1,
  perPage: 1,
  total: 0,
  state: STATUS_FETCH.IDLE,
};

export const getProducts = createAsyncThunk<TProductsResponse>(
  'posts/fetchPosts',
  async () => {
    const response = await productsApi();
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Thêm các action và reducer của bạn vào đây
  },
  extraReducers(builder) {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.state = STATUS_FETCH.SUCCESS;
      state.products = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.lastPage = action.payload.lastPage;
      state.perPage = action.payload.perPage;
      state.total = action.payload.total;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.state = STATUS_FETCH.ERROR;
    });
  },
});

// export selector
export const PRODUCTS_SELECTOR = (state: RootState) => state.productStore;

export default productsSlice.reducer;
