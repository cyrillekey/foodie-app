import { combineReducers } from 'redux';
import tabReducer from './tab/tabReducer';
import cartReducer from './cart/cartReducer';
import productReducer from './products/productReducer';
import userReducer from './user/userReducer';
export default combineReducers({
    tabReducer:tabReducer,
    cartReducer:cartReducer,
    productReducer:productReducer,
    userReducer:userReducer,
});
