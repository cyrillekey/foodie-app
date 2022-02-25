import { createStore ,applyMiddleware} from "redux";
import {persistReducer,persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk"

const persistConfig={
    key:'root',
    storage
}
const persistedReducer=persistReducer(persistConfig,rootReducer);

const store=createStore(persistedReducer,applyMiddleware(thunk));
let persistor=persistStore(store)

export {persistor,store};