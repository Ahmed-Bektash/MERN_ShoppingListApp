import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@emotion/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function createData(name, increase, amount, decrease,found,notAvailable) {
  return {
    name,
    increase,
    amount,
    decrease,
    found,
    notAvailable
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3,6,false),
  createData('Donut', 452, 25.0, 51, 4.9,6,false),
  createData('Eclair', 262, 16.0, 24, 6.0,6,false),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0,6,false),
  createData('Gingerbread', 356, 16.0, 49, 3.9,6,false),
  createData('Honeycomb', 408, 3.2, 87, 6.5,6,false),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3,6,false),
  createData('Jelly Bean', 375, 0.0, 94, 0.0,6,false),
  createData('KitKat', 518, 26.0, 65, 7.0,6,false),
  createData('Lollipop', 392, 0.2, 98, 0.0,6,false),
  createData('Marshmallow', 318, 0, 81, 2.0,6,false),
  createData('Nougat', 360, 19.0, 9, 37.0,6,false),
  createData('Oreo', 437, 18.0, 63, 4.0,6,false),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order; //-ve then a before b else b before a
    }
    return a[1] - b[1]; //if it's zero keep the order to make the sort stable
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: 'name',
    label: 'Item',
    sortable: true,
    width: '30%',
    alignment: 'left'
  },
  {
    id: 'increase',
    label: '+',
    sortable:false,
    width: '10%',
    alignment: 'center'
  },
  {
    id: 'amount',
    label: 'Num',
    sortable: true,
    width: '20%',
    alignment: 'center'
  },
  {
    id: 'decrease',
    label: '-',
    sortable:false,
    width: '10%',
    alignment: 'center'

  },
  {
    id: 'found',
    label: 'Found',
    sortable:false,
    width: '10%',
    alignment: 'center'

  },

  {
    id: 'notAvailable',
    label: 'N/A',
    sortable:false,
    width: '10%',
    alignment: 'center'
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? order : false}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const theme = useTheme();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor:(theme) =>
          theme.palette.secondary.main,
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Your Shopping List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {/* instead of null if you add filters (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      ) */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ShoppingListTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  //remove selection mechanism by commenting all the logic in case we need it later
  const handleSelectOne = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ maxWidth: '100%' }}
            aria-labelledby="tableTitle"
            size= 'medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{height:'4rem'}}
                      >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleSelectOne(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      
                      <TableCell 
                        align="center"
                        padding="none"
                      >
                        <AddCircleOutlineIcon
                        
                        />
                        </TableCell>
                      
                      <TableCell 
                      align="center"
                      padding="none"
                      >
                        {row.amount}
                      </TableCell>
                      
                      <TableCell 
                        align="center"
                        padding="none"
                        >
                        <RemoveCircleOutlineIcon
                        
                        />
                        </TableCell>

                        <TableCell 
                        align="center"
                        padding="none"
                        >
                        <CheckCircleIcon
                        sx={{color:theme.palette.secondary.main}}
                        />
                        </TableCell>

                        <TableCell
                         align="center"
                        padding="none"
                        >
                        <ErrorOutlineIcon
                        sx={{color:theme.palette.error.main}}
                        />
                        </TableCell>
                        
                       

                    </TableRow>
                  );
                })}
             
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
      
    </Box>
  );
}