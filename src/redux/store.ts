import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import IncomesReducer from "./slice/IncomeSlice";
import ExpensesReducer from "./slice/ExpenseSlice";
const persistConfig = {
  key: "store",
  storage,
};

const myReducers = combineReducers({
  IncomesReducer,
  ExpensesReducer,
});

const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
