import {useContext, useEffect, useState}from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Context} from '../logic/DataProvider.js'
import SideBar from './SideBar.js';
import Logout from './Logout.js';
import { BUTTON_SHAPE } from '../config.js';
import DarkModeButton from './DarkModeButton.js';


export default function NavBar() {
  const {GlobalState} = useContext(Context);
  const [listName, setListName] = useState(GlobalState.curr_list.name);
  const [listCategory, setListCategory] = useState(GlobalState.curr_list.category);
  useEffect(() => {
    setListName(()=>GlobalState.curr_list.name);
    setListCategory(()=>GlobalState.curr_list.category);
  }, [GlobalState.curr_list.name,GlobalState.curr_list.category])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideBar anchor={GlobalState.isMobile?"bottom":"left"} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {listCategory} {listName?':':'loading name...'} {listName}
          </Typography>
          <Logout shape={BUTTON_SHAPE.ICON}/>
          <DarkModeButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
