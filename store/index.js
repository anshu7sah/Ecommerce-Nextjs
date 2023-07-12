import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import sidebar from "./sidebarSlice";
import dialog from "./dialogSlice";

const reducers = combineReducers({ cart, sidebar, dialog });

const config = {
  key: "EcommerceCart",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  // reducer: { cart },
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
