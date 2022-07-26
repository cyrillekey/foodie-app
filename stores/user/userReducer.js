import * as userActions from './userActionTypes';
const initialState = {
    user:null,
    address:{
        latitude:-1.2433969,
        longitude:36.6633494,
    },
    jwtToken:'',
    paymentMethods:[],
    selectedCard:{},
    onboarded:false,
};

const userReducer = (state = initialState,action)=>{
    switch (action.type) {
        case userActions.SAVE_ADDRESS:
            return {
                ...state,address:action.payload,
            };
        case userActions.SAVE_CARD:
            let card = state.paymentMethods.find(c=>c.payment_id === action.payload.id);
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
        case userActions.ONBOARDED:
            return {...state,onboarded:true};
        case userActions.SAVE_PAYMENTS:
            return {...state,paymentMethods:action.payload};
        default:
            return state;
    }
};
export default userReducer;

