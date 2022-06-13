import * as userActions from './userActionTypes';
import { dummyData } from '../../constants';
const initialState = {
    user:null,
    address:{
        latitude:0,
        longitude:0,
    },
    jwtToken:'',
    paymentMethods:dummyData.allCards,
    selectedCard:{},
};

const userReducer = (state = initialState,action)=>{
    switch (action.type) {
        case userActions.SAVE_ADDRESS:
            return {
                ...state,address:action.payload,
            };
        case userActions.SAVE_CARD:
            let card = state.paymentMethods.find(c=>c.id == action.payload.id);
            return {
                ...state,selectedCard:card,
            };
        case userActions.SAVE_USER:
            let user = action.payload.user;
            return {...state,user:user};
        case userActions.SAVE_TOKEN:
            return {...state,jwtToken:action.payload.token};
        case userActions.LOGOUT:
            return {...state,user:null};
        default:
            return state;
    }
};
export default userReducer;

