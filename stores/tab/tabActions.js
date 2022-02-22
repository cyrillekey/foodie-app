import { SET_SELECT_TAB, SET_TEST } from "./actionTypes";

export const setSelectedTab = (payload)=>{
    return {type:SET_SELECT_TAB,payload};
};
export const setTest = (payload) =>{
    return {type:SET_TEST,payload};
};
