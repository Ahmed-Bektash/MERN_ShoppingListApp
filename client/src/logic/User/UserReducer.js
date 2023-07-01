

const  UserReducer= (state,action)=>{

    if(action.type === 'LOADING'){
        return {...state,loading:true}
    }

    if(action.type === 'DARK'){
        return {...state,darkMode:action.payload}
    }


    return state;
}















export default UserReducer;