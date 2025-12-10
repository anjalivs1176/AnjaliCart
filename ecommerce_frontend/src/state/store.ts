import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import sellerReducer from "./seller/sellerSlice";
import authReducer from "./AuthSlice";
import sellerProfileReducer from "./seller/sellerProfileSlice";
import sellerProductReducer from "./seller/sellerProductSlice";
import productSliceReducer from "./customer/ProductSlice";
import sellerOrderReducer from "./seller/sellerOrdersSlice";
import sellerTransactionsReducer from "./seller/sellerTransactionsSlice";
import reviewReducer from "./reviews/reviewSlice";



export const store = configureStore({
  reducer: {
    seller: sellerReducer,
    auth: authReducer,
    sellerProfile: sellerProfileReducer,
    sellerProduct:sellerProductReducer,
    product:productSliceReducer,
    sellerOrders: sellerOrderReducer,
    sellerTransactions: sellerTransactionsReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
