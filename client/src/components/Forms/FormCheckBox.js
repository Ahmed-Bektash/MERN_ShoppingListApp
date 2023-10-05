import React from 'react';
import { Checkbox, InputLabel, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';

const CheckBoxWrapper = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({...props,type:'checkbox'}); //uses formik context to create a field which has input props and meta which has supporting items like error and touched


  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(field.name, checked);
    
  };

  return (
    <>
        <InputLabel id="checkbox-label">
            <Checkbox {...field} {...props} checked={field.checked} value={field.value} onChange={handleChange} sx={{color:theme=>theme.palette.secondary.main}} />      
            {props.label}
        </InputLabel>
        <br />
        {meta && meta.touched && meta.error && <Typography sx={{color:theme=>theme.palette.error.light}}>
            {meta.error}
        </Typography>}
    </>
  );
};

//Implementation
{/* <CheckBoxWrapper label='your label' name='your checkboxname'/> */}

CheckBoxWrapper.propTypes = {
    value: PropTypes.string,
    label:PropTypes.string,
  };

export default CheckBoxWrapper;