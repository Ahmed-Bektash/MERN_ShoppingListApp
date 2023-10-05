import React, { useContext, useState, useEffect } from 'react'
import {Context} from '../logic/DataProvider'
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { GlobalStateActions } from '../logic/GlobalStateActions';
import { fetchItems } from '../logic/Item/ItemProvider';
import { PAGE_REF } from '../config';

function ListOfLists({lists,toggleDrawer,anchor}) {
    const theme = useTheme();
    const {ItemDispatch,GlobalDispatch,ListState,UserState} = useContext(Context);
  
   const newListHandler = (listID)=>{
      //handle history here

      const newList = ListState.ListsArray.find((list)=>list._id === listID);
      GlobalDispatch({type:GlobalStateActions.UPDATE_CURR_LIST,payload:newList});
      fetchItems(ItemDispatch,newList._id,UserState.token);

    } 

    
    
  return (
    <List>
        {lists.map((list, index) => (
                <Link key={list.name} 
                to={`lists/${list.category.toLowerCase()}/${list._id}`} style={{textDecoration:'none'}} 
                onClick={()=>newListHandler(list._id)}
                state={{ from: PAGE_REF.LISTS_NAV}}
                >
                      <ListItem disablePadding>
                              <ListItemButton 
                              onClick={toggleDrawer(anchor, false)}
                              onKeyDown={toggleDrawer(anchor, false)}
                              >
                                      <ListItemText primary={list.name} sx={{color:theme.palette.primary.light}} />
                              </ListItemButton>
                      </ListItem>
                    </Link>
                ))}
    </List>
  )
}

export default ListOfLists