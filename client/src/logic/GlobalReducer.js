

const  GlobalReducer= (state,action)=>{

    if(action.type === 'LOADING'){
        return {...state,loading:true}
    }

    if(action.type === 'DARK'){
        return {...state,darkMode:action.payload}
    }

    if(action.type === 'IS_MOBILE'){
        return {...state,isMobile:action.payload}
    }


    return state;
}















export default GlobalReducer;