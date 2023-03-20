import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import  TestSlice  from "./slice/TestSlice";
const persistConfig = {
    key: 'store',
    storage,
}

const myReducers = combineReducers({
    TestSlice,
})

const persistedReducer = persistReducer(persistConfig, myReducers);
export const store = configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: [thunk],
});
  
  
export const persistor = persistStore(store);