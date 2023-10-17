import {useContext}from 'react';
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideBar anchor={GlobalState.isMobile?"bottom":"left"} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {GlobalState.curr_list.name? GlobalState.curr_list.name: ""}
          </Typography>
          <Logout shape={BUTTON_SHAPE.ICON}/>
          <DarkModeButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
