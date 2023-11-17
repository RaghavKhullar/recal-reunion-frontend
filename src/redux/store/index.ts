import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";
import storage from "redux-persist/lib/storage";
import { UserReducer, MemoryReducer, AdminReducer } from "../reducer/index";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
	key: "root",
	storage,
}
const userReducers = reduceReducers(
	UserReducer,
	MemoryReducer
);
const rootReducer = combineReducers({
	user: userReducers,
	admin: AdminReducer
});

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
