import { configureStore } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import storage from "redux-persist/lib/storage";
import { UserReducer, MemoryReducer } from "../reducer/index";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
	key: "root",
	storage,
}
const rootReducer = reduceReducers(
	UserReducer,
	MemoryReducer
);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
