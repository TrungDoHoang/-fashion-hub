import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import productReducer from './slices/product';
import appReducer from './slices/app';

const store = configureStore({
  reducer: {
    // Thêm các reducer của bạn vào đây
    productStore: productReducer,
    appStore: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './slices/product';
export * from './slices/app';

export default store;
