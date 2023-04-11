import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import TestSlice from "./slice/TestSlice";
import IncomesReducer from "./slice/IncomeSlice";
import ExpensesReducer from "./slice/ExpenseSlice";
import CompanyReducer from "./slice/CompanySlice";
const persistConfig = {
  key: "stossdsre",
  storage,
};

const myReducers = combineReducers({
  TestSlice,
  IncomesReducer,
  ExpensesReducer,
  CompanyReducer,
});

const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
