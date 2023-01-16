import * as React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function ShoppingListHead(props) {
    const { order, orderBy, onRequestSort,headTitles } = props;
    
    const createSortHandler = (property) => (event) => { //because onclick
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
        <TableCell width={'5%'}> controls </TableCell>
        {headTitles.map((headCell) => (
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
  
  ShoppingListHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headTitles: PropTypes.array.isRequired
  };

  export {ShoppingListHead};
