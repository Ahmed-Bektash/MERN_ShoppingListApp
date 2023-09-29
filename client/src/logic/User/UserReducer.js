import { UserActions } from "./UserActions";


const  UserReducer= (state,action)=>{

    if(action.type === UserActions.LOADING){
        return {...state,loading:true}
    }

    if(action.type === UserActions.LOAD_USER){
        return {
            ...state,
            isAuth:true,
            token:action.payload.token,
            username: action.payload.username,
            lists:action.payload.lists,
            loading:false  
            }
    }


    return state;
}















export default UserReducer;