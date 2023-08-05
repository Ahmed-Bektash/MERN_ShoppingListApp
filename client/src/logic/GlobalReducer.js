import { GlobalStateActions } from "./GlobalStateActions";


const  GlobalReducer= (state,action)=>{

    if(action.type === GlobalStateActions.LOADING){
        return {...state,loading:true}
    }

    if(action.type === GlobalStateActions.DARK){
        return {...state,darkMode:action.payload}
    }

    if(action.type === GlobalStateActions.IS_MOBILE){
        return {...state,isMobile:action.payload}
    }

    if(action.type === GlobalStateActions.UPDATE_CURR_LIST){
        return {...state,curr_list:action.payload}
    }


    return state;
}















export default GlobalReducer;