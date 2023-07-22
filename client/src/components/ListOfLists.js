import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

function ListOfLists({lists,toggleDrawer,anchor}) {
    const theme = useTheme();
   
    
  return (
    <List>
        {lists.map((list, index) => (
                    <Link key={list.name} to={`lists/${list.category.toLowerCase()}/${index}`} style={{textDecoration:'none'}}>
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