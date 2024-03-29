import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { ShoppingListItem } from './ListItem';
import { ShoppingListHead } from './ShoppingListHead';
import { LIST_TYPES } from '../config';

function descendingComparator(a, b, orderBy) {
    //we only want desc here, so if elment orderBy in object b is < the same in a then a is bigger so return -1 to put it first
    //otherwise return 1 to put b first because it's bigger 
    if (b[orderBy] < a[orderBy]) { 
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function stableSort(array, orderType,orderBy) { 
    //split them to el and index so that we sort on el or if no sorting needed (ret is 0) keep order by sorting by index
    const stabilizedThis = array.map((el, index) => [el, index]);
    
    stabilizedThis.sort((a, b) => {   
     const  order =  orderType === 'desc' //always check for desc only and reverse it if the order desired is asc
      ? descendingComparator(a[0], b[0], orderBy)
      : -descendingComparator(a[0], b[0], orderBy);
      if (order !== 0) {
        return order; //-ve then a before b else b before a
      }
      return a[1] - b[1]; //if it's zero keep the order to make the sort stable by sorting by index which is already in order
    });
    
    return stabilizedThis.map((el) => el[0]); //return array of elements after sorting
  }

const headCells = [
    
    {
      id: 'name',
      label: 'Item',
      sortable: true,
      alignment:'flex-start',
      width: 'auto'
    },
    {
      id: 'amount',
      label: 'Amount',
      sortable: true,
      alignment:'center',
      width: '10%'
    },
    
  ];
  

export default function ShoppingListTable(props) {
    const {rows,title,curr_list} = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('item');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
  
    return (
      <Box sx={{width:"100%"}}>
        <Paper sx={{mb:2}}>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            padding={"1rem"}
          >
            {title}
          </Typography>
          
          {(rows.length > 0) && <ShoppingListHead
                headTitles={(curr_list.category === LIST_TYPES.SHOPPING)?headCells:headCells.filter((cell)=>cell.id !== 'amount')}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
            />}

          <List>
              {stableSort(rows,order,orderBy).map((row) => (
                <ShoppingListItem key={row._id} row={row} />
              ))}
          </List>

        </Paper>
      </Box>
      );
    }
    
ShoppingListTable.propTypes = {
    rows: PropTypes.array.isRequired,
  };
