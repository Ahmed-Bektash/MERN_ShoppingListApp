import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICONS } from '../config';


const IconToRender = ({icon_idx,styles})=>{
  switch (icon_idx) {
    case ICONS.COPY:
      return <ContentCopyIcon sx={{color:'blue'}}/>
    case ICONS.INCREASE:
        return <AddCircleOutlineIcon sx={styles}/>
    case ICONS.DECREASE:
        return <RemoveCircleOutlineIcon sx={styles}/>
    case ICONS.DEL:
        return <DeleteIcon sx={styles}/>
    case ICONS.DONE:
        return <CheckCircleIcon sx={styles}/>
    case ICONS.NA:
        return <ErrorOutlineIcon sx={styles}/>
    default:
      break;
  }
}

function CustomButton({type,variant,clickHandler,buttonStyles,text,textStyles,icon=undefined}) {
  return (
    <>
    {
      icon ?
        <IconButton onClick={clickHandler}>
          <IconToRender icon_idx={icon} styles={buttonStyles}/>
        </IconButton>
      :
        <Button type={type} variant={variant} onClick={clickHandler} sx={buttonStyles}>
          <Typography variant='button' sx={textStyles}>
            {text}
          </Typography>
        </Button>
    }
    </>
  )
}

export default CustomButton