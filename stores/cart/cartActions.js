import { ADD_TO_CART,REDUCE_QTY,REMOVE_FROM_CART,INCREASE_QTY } from "./cartActionTypes";

export const addToCart = (payload)=>{
    return {type:ADD_TO_CART,payload};
};
export const reduceQty = (payload)=>{
    return {type:REDUCE_QTY,payload};
};
export const removeFromCart = (payload) =>{
    return {type:REMOVE_FROM_CART,payload};
};
export const increaseQty = (payload)=>{
    return {type:INCREASE_QTY,payload};
};
