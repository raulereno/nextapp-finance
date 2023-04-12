import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import IncomesReducer from "./slice/IncomeSlice";
import ExpensesReducer from "./slice/ExpenseSlice";
import CompanyReducer from "./slice/CompanySlice";
import PersonalReducer from "./slice/PersonalSlice";

const persistConfig = {
  key: "stossssdssre",
  storage,
};

const myReducers = combineReducers({
  IncomesReducer,
  ExpensesReducer,
  CompanyReducer,
  PersonalReducer,
});

const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
