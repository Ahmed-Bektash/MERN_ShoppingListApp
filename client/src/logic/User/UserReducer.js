import { UserActions } from "./UserActions";


const  UserReducer= (state,action)=>{

    if(action.type === UserActions.LOADING){
        return {...state,loading:action.payload}
    }

    if(action.type === UserActions.LOAD_USER){
        return {
            ...state,
            isAuth:true,
            token:action.payload.token,
            username: action.payload.username,
            email: action.payload.email,
            lists:action.payload.lists,
            loading:false  
            }
    }

    if(action.type === UserActions.CLEAR_USER)
    {
        return {
            isAuth:false, //later get it from cookies,
            token: null,
            username: null,
            isLoading:false,
            lists:[]  
        }
    }

    if(action.type === UserActions.EDIT_USER){
        return {
            ...state,
            username: action.payload.username,
            // email: action.payload.email,
            loading:false  
            }
    }

    return state;
}















export default UserReducer;