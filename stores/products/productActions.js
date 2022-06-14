import { ADD_PRODUCTS,ADD_FAVOURITE,REMOVE_FAVOURITE, SAVE_CATEGORY ,SAVE_ORDERS, CLEAR_CART} from './productActionTypes';

export const addProducts = (payload) =>{
    return {type:ADD_PRODUCTS,payload};
};
export const addFavourite = (payload) =>{
    return {type:ADD_FAVOURITE,payload};
};
export const removeFavourite = (payload) =>{
    return {type:REMOVE_FAVOURITE,payload};
};
export const saveCategory = (payload) =>{
    return {type:SAVE_CATEGORY,payload};
};
export const addOrders = (payload) => {
    return {type:SAVE_ORDERS,payload};
};
export const clearCart = (payload) => {
    return {type:CLEAR_CART,payload};
};


