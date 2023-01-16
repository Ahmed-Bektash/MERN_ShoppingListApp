import * as React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { ListItem, ListItemText, Typography,Container } from '@mui/material';

function ShoppingListHead(props) {
    const { order, orderBy, onRequestSort,headTitles } = props;
    
    const createSortHandler = (property) => (event) => { //because onclick
      onRequestSort(event, property);
    };

    return (
        <ListItem>
            <Typography> controls </Typography>
            
            <Container disableGutters sx={{
                display:'flex',
                justifyContent:"space-between",
                alignItems:"center",
                paddingLeft:'2rem'

            }}>

                {headTitles.map((headCell) => (
                    <Typography
                    key={headCell.id}
                    // align={headCell.alignment}
                    // padding={'normal'}
                    // sortDirection={orderBy === headCell.id ? order : 'asc'}
                    // width={headCell.width}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        disabled = {!headCell.sortable}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label} 
                        </TableSortLabel>
                    </Typography>
                ))}
            </Container>
        </ListItem>
    );
  }
  
  ShoppingListHead.propTypes = {
      onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headTitles: PropTypes.array.isRequired
  };

  export {ShoppingListHead};
