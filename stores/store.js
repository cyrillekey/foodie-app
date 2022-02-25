import { createStore ,applyMiddleware} from "redux";
import {persistReducer,persistStore} from "redux-persist";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key:'root',
    blacklist:['tabReducer'],
    storage:AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store);

export {persistor,store};
