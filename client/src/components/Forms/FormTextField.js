import React from 'react';
import { TextField, Typography } from '@mui/material';
import {useField } from 'formik';
import PropTypes from 'prop-types';


const TextFieldWrapper = (props) => {
  const [field, meta] = useField(props); //uses formik context to create a field which has input props and meta which has supporting items like error and touched
//props.type==="array"?Array(field.value):field.value --> this was the old implementation in values prop below   
return (
    <>
    <TextField {...field} value={field.value ?? props.value} label={props.label} fullWidth/>
    <br />
    {meta && meta.touched && meta.error && <Typography sx={{color:theme=>theme.palette.error.light}}>
        {meta.error}
    </Typography>}
    </>
  );
};

TextFieldWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    label:PropTypes.string,
    type:PropTypes.oneOf(["single" , "array"])
  };

export default TextFieldWrapper;