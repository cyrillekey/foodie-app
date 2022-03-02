import { ADD_PRODUCTS,ADD_FAVOURITE,REMOVE_FAVOURITE } from "./productActionTypes";

export const addProducts = (payload) =>{
    return {type:ADD_PRODUCTS,payload};
};
export const addFavourite = (payload) =>{
    return {type:ADD_FAVOURITE,payload};
};
export const removeFavourite = (payload) =>{
    return {type:REMOVE_FAVOURITE,payload};
};
