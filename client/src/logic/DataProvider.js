import React, {useEffect, createContext,useReducer} from 'react'
import ItemReducer from './Item/ItemReducer'
import axios from 'axios';
import useWindowDimensions from './utils'
import Cookies from 'js-cookie';
import GlobalReducer from './GlobalReducer';
import { fetchItems } from './Item/ItemProvider';
import { init_globState, init_item, init_lists } from './InitialStates';
import ListReducer from './List/ListReducer';
import { fetchLists } from './List/ListProvider';

export const Context = createContext();
 
export  const ToggleDarkMode = (dispatch,isDarkModeRequested)=>{
    dispatch({type:'DARK',payload:isDarkModeRequested});
}

export const Provider = ({children}) =>{

    const [GlobalState,GlobalDispatch] = useReducer(GlobalReducer,init_globState);
    const [ItemState,ItemDispatch] = useReducer(ItemReducer,init_item); //looks for reducer function and initial state
    const [ListState,ListDispatch] = useReducer(ListReducer,init_lists); 
    // const {WindowWidth} = useWindowDimensions();

    // const loc_isMobile = (WindowWidth <= 700 ? true : false);
    // GlobalDispatch({type:'IS_MOBILE',payload:loc_isMobile});


   useEffect(()=>{
    const client_cookies= Cookies.get();
    GlobalDispatch({type: 'DARK',payload:client_cookies['darkMode'] === 'ON'? true : false});
    fetchItems(ItemDispatch);
    fetchLists(ListDispatch);
   },[]);
    
    return(

    <Context.Provider value={{ListState,ListDispatch,ItemState,ItemDispatch,GlobalState,GlobalDispatch}}>
        {children}
    </Context.Provider>
    );
}



