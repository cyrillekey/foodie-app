import { REMOVE_USER, SAVE_ADDRESS, SAVE_CARD, SAVE_USER } from "./userActionTypes";

export const saveAddress = (payload)=>{
    return {type:SAVE_ADDRESS,payload};
};
export const saveUser = (payload) =>{
    return {type:SAVE_USER,payload};
};
export const removeUser = (payload) =>{
    return {type:REMOVE_USER,payload};
};
export const saveCard = (payload) =>{
    return {type:SAVE_CARD,payload};
};

