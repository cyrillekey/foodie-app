import { LOGOUT, ONBOARDED, REMOVE_USER, SAVE_ADDRESS, SAVE_CARD, SAVE_PAYMENTS, SAVE_TOKEN, SAVE_USER } from './userActionTypes';

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
export const saveToken = (payload) => {
    return {type:SAVE_TOKEN,payload};
};
export const logoutUser = (payload) =>{
    return {type:LOGOUT,payload};
};

export const viewedOnboarding = (payload) =>{
    return {type:ONBOARDED,payload};
};
export const savePaymentMethods = (payload) =>{
    return {type:SAVE_PAYMENTS,payload};
};

