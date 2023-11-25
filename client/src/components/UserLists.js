import React, { useState,useContext } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ListOfLists from './ListOfLists';
import { list_categories } from '../config';
import {Context} from '../logic/DataProvider';

function UserLists({anchor,toggleDrawer}) {
  const theme = useTheme();
  const {ListState} = useContext(Context);

  const [expandList,setExpandList] = useState(false);

  const filter_lists = (category)=>{
        return ListState.ListsArray.filter((list)=>list.category === category)
  }
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandList(isExpanded ? panel : false);
  };
 
 const AccordionStyles = {
    // height:'6rem',
    backgroundColor:theme.palette.primary.main,
 }

 const AccordionSummaryStyles = {
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'none',
    },
    '& .MuiAccordionSummary-expandIconWrapper':{

        color: theme.palette.primary.light
    }
}
  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
        {list_categories.map((list, index) => (
            <Accordion disableGutters elevation={0} square key={index} expanded={expandList === list.name} onChange={handleChange(list.name)} sx={AccordionStyles} TransitionProps={{ unmountOnExit: true }} >
            <AccordionSummary
              expandIcon={list.icon}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={AccordionSummaryStyles}
            >
              <Typography sx={{ width: '33%', flexShrink: 0, color:theme.palette.primary.light }}>
                    {list.name}
              </Typography>
       
            </AccordionSummary>
            <AccordionDetails>
                    <ListOfLists lists={filter_lists(list.name)} toggleDrawer={toggleDrawer} anchor={anchor}/>
            </AccordionDetails>
          </Accordion>
       
        ))}
    </Box>
  )
}

export default UserLists