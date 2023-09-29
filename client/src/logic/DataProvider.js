import React, {useEffect, createContext,useReducer} from 'react'
import ItemReducer from './Item/ItemReducer'
import useWindowDimensions from './utils'
import Cookies from 'js-cookie';
import GlobalReducer from './GlobalReducer';
import { init_globState, init_item, init_lists, init_user } from './InitialStates';
import ListReducer from './List/ListReducer';
import { GlobalStateActions } from './GlobalStateActions';
import { listActions } from './List/ListActions';
import { ItemActions } from './Item/ItemActions';
import UserReducer from './User/UserReducer';
import { UserActions } from './User/UserActions';

export const Context = createContext();
 
export  const ToggleDarkMode = (dispatch,isDarkModeRequested)=>{
    dispatch({type:GlobalStateActions.DARK,payload:isDarkModeRequested});
}

export const fetchUserData = async(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch)=>{
    //fetch user
    const token = localStorage.getItem("token");
    let user = undefined;
    UserDispatch({type:listActions.LOADING});
    const UserResponse = await fetch('/api/users/me', {
      method: 'GET', // *GET is default anyway
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }});
    user = await UserResponse.json();
    const userpayload = {
      username: user.message.name,
      token: token,
      lists:user.message.lists
    }
    UserDispatch({type:UserActions.LOAD_USER,payload:userpayload});
    

    if(user.message.lists.length > 0)
    {
      //fetch lists for the user
      ListDispatch({type:listActions.LOADING});
      const Listresponse = await fetch('/api/lists', {
       method: 'GET', // *GET is default anyway
       mode: 'cors', // no-cors, *cors, same-origin
       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       credentials: 'same-origin', // include, *same-origin, omit
       headers: {
         'Content-Type': 'application/json',
         'authorization': `Bearer ${token}`
       }});
       const userLists = await Listresponse.json();
       const newList = userLists.message.find((list)=>list._id === user.message.lists[0]); //make it last curr_list
       if(newList)
       {
         GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
         ListDispatch({type:listActions.DISPLAY_LISTS,payload:userLists.message});
       }
  
      // fetch the items for the list
      const list_id = newList._id;
      ItemDispatch({type:GlobalStateActions.LOADING});
      const Itemresponse = await fetch(`/api/items/${list_id}`, {
      method: 'GET', // *GET is default anyway
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }});
     const cartArray = await Itemresponse.json();
     ItemDispatch({type:ItemActions.DISPLAY,payload:cartArray.message});
    }
    
  }
 
export const Provider = ({children}) =>{

    const [GlobalState,GlobalDispatch]  = useReducer(GlobalReducer,init_globState);
    const [ItemState,ItemDispatch]      = useReducer(ItemReducer,init_item); 
    const [ListState,ListDispatch]      = useReducer(ListReducer,init_lists); 
    const [UserState,UserDispatch]      = useReducer(UserReducer,init_user); 
    // const {WindowWidth} = useWindowDimensions();

    // const loc_isMobile = (WindowWidth <= 700 ? true : false);
    // GlobalDispatch({type:GlobalStateActions.IS_MOBILE,payload:loc_isMobile});
    

   useEffect(()=>{ //get color mode and user
    const client_cookies= Cookies.get();
    const token = localStorage.getItem("token");
    GlobalDispatch({type: GlobalStateActions.DARK,payload:client_cookies['darkMode'] === 'ON'? true : false});
    
    if(token){
      fetchUserData(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch);
    }
    
    },[]);
   
    return(

    <Context.Provider value={{UserState,UserDispatch,ListState,ListDispatch,ItemState,ItemDispatch,GlobalState,GlobalDispatch}}>
        {children}
    </Context.Provider>
    );
}



