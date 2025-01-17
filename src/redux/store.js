import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { campersReducer } from "./campers/slice";

const persistConfig = {
  key: "campers",
  storage,
  whitelist: ["campers"],
};

export const store = configureStore({
  reducer: {
    campers: persistReducer(persistConfig, campersReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

store.subscribe(() => {
  const { campers } = store.getState();
  localStorage.setItem("favoriteCampers", JSON.stringify(campers.favorites));
  // localStorage.setItem("favoriteCampers", JSON.stringify([]));
});

export const persistor = persistStore(store);
