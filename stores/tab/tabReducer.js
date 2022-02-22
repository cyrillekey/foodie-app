import * as tabActions from './actionTypes';

const initialState = {
    selectedTab:'',
    test:'',
};


const tabReducer = (state = initialState,action)=>{
    switch (action.type){
        case tabActions.SET_SELECT_TAB:
            return {
                ...state,selectedTab:action.payload.selectedTab,
            };
        case tabActions.SET_TEST:
            return {
                ...state,test:action.payload.test,
            };
         default:
            return state;
    }
};

export default tabReducer;
