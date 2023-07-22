import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import UserLists from './UserLists.js';
import ListAddition from './ListAddition.js';


export default function SideBar(props) {
  const theme = useTheme();
  const {anchor} = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const drawerStyles = {
    '& .MuiDrawer-paper': {
        backgroundColor:theme.palette.primary.main,
      },
 }

  return (      
    <React.Fragment>
        <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 ,color:theme.palette.secondary.main}}
            onClick ={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
        </IconButton>
        <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        sx={drawerStyles}
        >
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{color:theme.palette.secondary.main,alignSelf:'self-start',ml:'0.5rem'}}
                onClick ={toggleDrawer(anchor, false)}
              >
                <MenuIcon />
            </IconButton>
            <Typography variant="h5" padding='1rem' color={theme.palette.primary.light}>
                Your lists
            </Typography>
            <ListAddition />
            <UserLists anchor={anchor} toggleDrawer={toggleDrawer} />
        </Drawer>
    </React.Fragment>
  );
}
