import React from 'react';
import { Typography } from '@mui/material';
import {useField } from 'formik';
import PropTypes from 'prop-types';
import { CustomTextField } from './CustomInputs';

const TextFieldWrapper = (props) => {
  const [field, meta] = useField(props); //uses formik context to create a field which has input props and meta which has supporting items like error and touched
//props.type==="array"?Array(field.value):field.value --> this was the old implementation in values prop below   

return (
    <>
      <CustomTextField {...field} value={field.value ?? props.value} label={props.label} fullWidth type={props.type} />
    <br />
    {meta && meta.touched && meta.error && <Typography sx={{color:theme=>theme.palette.error.main}}>
        {meta.error}
    </Typography>}
    </>
  );
};

TextFieldWrapper.propTypes = {
    value: PropTypes.string,
    label:PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
  };

export default TextFieldWrapper;