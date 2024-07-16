import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import productReducer from "./Slice/productSlice";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

const persistConfig ={
    key:"root",
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store)