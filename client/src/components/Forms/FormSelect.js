import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select, Typography, InputLabel } from '@mui/material';
import {useField, useFormikContext } from 'formik';



const SelectWrapper = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(field.name, value);
    if(props.stateset){
      props.stateset(value);
    }
  };

/***NOTE: Previously had {...props} on the select element below but removed it so that i am able to add a function as a prop (stateSet),
 *        if you want to access a prop you have to add it manually now.
 * */

  return (
    <>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select {...field}  onChange={handleChange} value={field.value ?? props.value} labelId='select-label' variant={props.variant} fullWidth={props.fullWidth}>
        {props.options.map((item, pos) => {
          return (
            <MenuItem key={pos} value={item}>
              {item}
            </MenuItem>
          )
        })}
      </Select>
      {meta && meta.touched && meta.error && <Typography sx={{color:theme=>theme.palette.error.main}}>
        {meta.error}
    </Typography>}
    </>
  );
};

//implementation:
//<SelectWrapper label='your label' options={array of options} value={initial value} name='your name'/> 


SelectWrapper.propTypes = {
    value: PropTypes.string.isRequired,
    label:PropTypes.string,
    options:PropTypes.arrayOf(PropTypes.string),
    variant:PropTypes.oneOf(["filled" , "standard" , "outlined"]),
    fullWidth:PropTypes.bool,
    stateset:PropTypes.func
  };
export default SelectWrapper;