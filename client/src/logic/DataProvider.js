import React, {useEffect, createContext,useReducer, useState} from 'react'
import ItemReducer from './Item/ItemReducer'
import axios from 'axios';
import useWindowDimensions from './utils'
import Cookies from 'js-cookie';
import GlobalReducer from './GlobalReducer';
import { init_globState, init_item, init_lists } from './InitialStates';
import ListReducer from './List/ListReducer';
import { GlobalStateActions } from './GlobalStateActions';
import { listActions } from './List/ListActions';
import { ItemActions } from './Item/ItemActions';

export const Context = createContext();
 
export  const ToggleDarkMode = (dispatch,isDarkModeRequested)=>{
    dispatch({type:GlobalStateActions.DARK,payload:isDarkModeRequested});
}

export const fetchUserData = async(GlobalDispatch,ListDispatch,ItemDispatch)=>{
    //fetch user

    //fetch lists for the user
    ListDispatch({type:listActions.LOADING});
    const Listresponse = await fetch('/api/lists', {
     method: 'GET', // *GET is default anyway
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     credentials: 'same-origin', // include, *same-origin, omit
     headers: {
       'Content-Type': 'application/json'
     }});
    const userLists = await Listresponse.json();
    const newList = userLists.find((list)=>list._id === '64bbbb115d262b05270722da'); //make it last curr_list
    GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
    ListDispatch({type:listActions.DISPLAY_LISTS,payload:userLists});

    // fetch the items for the list
    const list_id = newList._id;
    ItemDispatch({type:GlobalStateActions.LOADING});
    const Itemresponse = await fetch(`/api/items/${list_id}`, {
    method: 'GET', // *GET is default anyway
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    }});
   const cartArray = await Itemresponse.json();
   ItemDispatch({type:ItemActions.DISPLAY,payload:cartArray});
  }
 
export const Provider = ({children}) =>{

    const [GlobalState,GlobalDispatch] = useReducer(GlobalReducer,init_globState);
    const [ItemState,ItemDispatch] = useReducer(ItemReducer,init_item); 
    const [ListState,ListDispatch] = useReducer(ListReducer,init_lists); 
    // const {WindowWidth} = useWindowDimensions();

    // const loc_isMobile = (WindowWidth <= 700 ? true : false);
    // GlobalDispatch({type:GlobalStateActions.IS_MOBILE,payload:loc_isMobile});
    

   useEffect(()=>{ //get color mode and user
    const client_cookies= Cookies.get();
    GlobalDispatch({type: GlobalStateActions.DARK,payload:client_cookies['darkMode'] === 'ON'? true : false});
    fetchUserData(GlobalDispatch,ListDispatch,ItemDispatch);
    
},[]);
    
//    redirect(`/lists/${GlobalState.curr_list.category}/${GlobalState.curr_list._id}`);
   
    return(

    <Context.Provider value={{ListState,ListDispatch,ItemState,ItemDispatch,GlobalState,GlobalDispatch}}>
        {children}
    </Context.Provider>
    );
}



