import {
  combineReducers,
  StateFromReducersMapObject,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  USERS_API_KEY,
  usersApi,
  USERS_SLICE,
  userSlice,
  AuthState,
} from "./api/users.store";

const reducer = {
  [USERS_API_KEY]: usersApi.reducer,
  [USERS_SLICE]: userSlice.reducer,
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(usersApi.middleware),
    preloadedState,
  });

export const store = makeStore();
export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
