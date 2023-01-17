import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import {Context} from '../logic/DataProvider.js'


export default function SideBar(props) {
  const theme = useTheme();
  const {darkMode} = React.useContext(Context);
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color:theme.palette.primary.light}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{color:theme.palette.primary.light}}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
        >
            <Typography variant="h5" padding='1rem' color={theme.palette.primary.light}>
                Your other lists
            </Typography>
            {list(anchor)}
        </Drawer>
    </React.Fragment>
  );
}
