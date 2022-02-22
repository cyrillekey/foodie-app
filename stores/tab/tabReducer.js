import * as tabActions from './actionTypes';

const initialState = {
    selectedTab:'HOME',
    test:'',
};


const tabReducer = (state = initialState,action)=>{
    switch (action.type){
        case tabActions.SET_SELECT_TAB:
            return {
                ...state,selectedTab:action.payload.selectedTab,
            };
        case tabActions.SET_TEST:
            //console.log(action.payload);
            return {
                ...state,test:action.payload.test,
            };
         default:
            return state;
    }
};

export default tabReducer;
