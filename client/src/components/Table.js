import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
      alignment:'left',
      width: 'auto'
    },
    {
      id: 'amount',
      label: 'amount',
      sortable: true,
      alignment:'center',
      width: '5%'
    },
    
  ];

//   const iconControls = [
//     {
//         id: 'found',
//         label: 'Found',
//         sortable:false,
//         width: 'auto',
      
//       },
//       {
//         id: 'decrease',
//         label: '-',
//         sortable:false,
//         width: 'auto',
      
//       },
//       {
//         id: 'increase',
//         label: '+',
//         sortable:false,
//         width: 'auto',
//       },
//       {
//         id: 'notFound',
//         label: 'N/A',
//         sortable:false,
//         width: 'auto',
//       },
//       {
//         id: 'Delete',
//         label: 'Del',
//         sortable:false,
//         width: 'auto',
//       }

//   ]
  
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    
    const createSortHandler = (property) => (event) => { //because onclick
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
        <TableCell width={'5%'}> controls </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignment}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : 'asc'}
              width={headCell.width}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                disabled = {!headCell.sortable}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label} 
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };


  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return(
        <React.Fragment>

                <TableRow 
                hover
                sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    height:'4rem'    
                }}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    
                    <TableCell component="th" scope="row" padding="none">
                        {row.name}
                    </TableCell>
                        
                    
                    <TableCell padding="none" align='center'>
                    {row.amount}
                    </TableCell>
                           
                </TableRow>
                
                <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="controls">
                <TableHead>
                  <TableRow>
                    <TableCell padding='none'>Found</TableCell>
                    <TableCell padding='none'>Dec</TableCell>
                    <TableCell padding='none'>Inc</TableCell>
                    <TableCell padding='none'>N/A</TableCell>
                    <TableCell padding='none'>Del</TableCell>
                  </TableRow>
                </TableHead>
                    <TableBody>
                        <TableRow>
                        
                        <TableCell padding="none">
                        < IconButton>
                            <CheckCircleIcon sx={{color:theme.palette.secondary.main}}  />  
                        </IconButton>
                        </TableCell>    

                        <TableCell padding="none">
                            < IconButton>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                        
                        <TableCell padding="none">
                            < IconButton>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton>
                                <ErrorOutlineIcon sx={{color:theme.palette.error.main}} />
                            </IconButton>
                        </TableCell>

                        <TableCell padding="none">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell> 
                        </TableRow>
                    </TableBody>
                </Table>
                </Box>
                </Collapse>
                </TableCell>
                </TableRow>
                </React.Fragment>
    )
}

export default function ShoppingListTable(props) {
    const {rows} =props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('item');
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
      let isMobile = true;
      const tableWidth = isMobile? '100%':"80%";
  return (
    <Box >
    <Paper sx={{ width:tableWidth, mb:2 }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
          padding={"1rem"}
        >
          Title of shopping list
        </Typography>

        <TableContainer>
        <Table  sx={{ maxWidth: '100%' }} aria-label="simple table">
            
            <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            />
            <TableBody>
            {stableSort(rows,order, orderBy).map((row) => (
                <Row key={row.name} row={row}/>  
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Paper>
        </Box>
        );
    }
    
ShoppingListTable.propTypes = {
    rows: PropTypes.array.isRequired,
  };
