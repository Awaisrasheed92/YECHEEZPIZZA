import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import UserorderSlice from "./shopping-cart/UserorderSlice"; // Corrected the import name

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);
const persistedCartUiReducer = persistReducer(persistConfig, cartUiSlice.reducer);
const persistedUserorderReducer = persistReducer(persistConfig, UserorderSlice.reducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    cartUi: persistedCartUiReducer,
    Userorder: persistedUserorderReducer, 
  },
});

const persistor = persistStore(store);

export { store, persistor };
