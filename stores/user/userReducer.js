import * as userActions from './userActionTypes';

const initialState = {
    user:[],
    address:{
        latitude:0,
        longitude:0,
    },
};

const userReducer = (state = initialState,action)=>{
    switch (action.type) {
        case userActions.SAVE_ADDRESS:
            return {
                ...state,address:action.payload,
            };
        default:
            return state;
    }
};
export default userReducer;

