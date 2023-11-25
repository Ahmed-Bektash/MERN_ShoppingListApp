import { Select, TextField, styled } from "@mui/material";

//Needs to be defined externally so that it does not render every time the parent text field renders which is on every text input which would make it lose focus!
export const CustomTextField = styled(TextField)({
    '& label': {
        color: '#A0AAB4',
    },
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
    },
  })



  export const CustomSelectField = styled(Select)({
 
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#6F7E8C', //mid gray
      
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B2BAC2', //light gray
    },
    
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6F7E8C', //dark gray
    },
    '.MuiSelect-icon':{
      color:'#0A9279' //teal
    }
  })