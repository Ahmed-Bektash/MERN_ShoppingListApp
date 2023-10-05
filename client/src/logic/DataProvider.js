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
import { AuthUser } from './User/UserProvider';
import { fetchLists } from './List/ListProvider';
import { fetchItems } from './Item/ItemProvider';

export const Context = createContext();
 
export  const ToggleDarkMode = (dispatch,isDarkModeRequested)=>{
    dispatch({type:GlobalStateActions.DARK,payload:isDarkModeRequested});
}

export const fetchUserData = async(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch,token)=>{
    //fetch user
    GlobalDispatch({type:GlobalStateActions.LOADING,payload:true});

    let user = await AuthUser(UserDispatch,token);    
    if((user) && (user.lists.length > 0))
    {
      const userLists = await fetchLists(ListDispatch,GlobalDispatch,user,token);
      const newList = userLists.find((list)=>list._id === user.lists[0]); //make it last curr_list
      if(newList)
      {
        GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
        ListDispatch({type:listActions.DISPLAY_LISTS,payload:userLists});
        await fetchItems(ItemDispatch,newList._id,token);
      }
    GlobalDispatch({type:GlobalStateActions.LOADING,payload:false});

      
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
      fetchUserData(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch,token);
    }
    
    },[]);
   
    return(

    <Context.Provider value={{UserState,UserDispatch,ListState,ListDispatch,ItemState,ItemDispatch,GlobalState,GlobalDispatch}}>
        {children}
    </Context.Provider>
    );
}



