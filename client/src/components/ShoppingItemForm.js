import React, { useContext, useState, useEffect } from 'react';
import {Context} from '../logic/DataProvider'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from './Forms/FormTextField';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';
import { ITEM_TYPES, LIST_TYPES, item_types_list } from '../config';
import SelectWrapper from './Forms/FormSelect';

function ShoppingItemForm(props) {
    const {EndPointFunc,CloseModal,item_dispatch,InitialStateValues} = props
    const {GlobalState , ItemState} = useContext(Context);
  const [type,setType] = useState(ITEM_TYPES.CHECKLIST);
  // const [itemExists, setItemExists] = useState(false)
  useEffect(() => {
    
    if(GlobalState.curr_list.category === LIST_TYPES.SHOPPING)
    {
      setType(ITEM_TYPES.SHOPPING);
    }
    
    }, [GlobalState.curr_list])
    
    const initialValues=InitialStateValues;
    // {
    //     name:"",
    //     type:"",
    //     description:"",
    //     amount:1,
    //   } 

      const validation = Yup.object({
        name: Yup.string().required('Required'),
        type: Yup.string().oneOf(item_types_list),
        description: Yup.string(),
        amount: Yup.number().positive("Please input positive numbers only").typeError("Please input numbers only here"),
      })

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
           // console.log(values)
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          const newItem = {
           _id: InitialStateValues._id?InitialStateValues._id:null, //will have a value only in edit
           name:values.name,
           type: GlobalState.curr_list.category === LIST_TYPES.SHOPPING?ITEM_TYPES.SHOPPING:values.type,
           description: values.description,
           amount:values.amount,
          }

          if(newItem.name){ 
            const existingItem = ItemState.ItemsArray.find((item)=>(newItem.name.toLowerCase()===item.name.toLowerCase()))
            if(existingItem && (newItem._id === null))
            {
              NotifyUser(NOTIFICATION_TYPE.WARN,"Note! This Item already exists! we did not add it but you can update it");
            }
            else
            {
              //add amount
              EndPointFunc(item_dispatch,newItem,GlobalState.curr_list._id,null);

              
            }
            //close the modal
            CloseModal();

            }
        }}
      >
        <Form>
          {/* normal way in docs 
          <label htmlFor="weight">Weight</label>
          <Field id="weight" name="weight" placeholder="Weight" />
          <ErrorMessage name="weight" /> */}

          {/* https://stackoverflow.com/questions/61089182/how-to-properly-use-usefield-hook-from-formik-in-typescript */}

            <Grid item xs={12} sx={{mb: 3 }}>
             <TextFieldWrapper label="Item name" value="" name={'name'} autoFocus={true}/>
            </Grid>

            {GlobalState.curr_list.category !== LIST_TYPES.SHOPPING &&
            <Grid item xs={12} sx={{mb: 2 }}>
              <SelectWrapper 
                  label='Type' 
                  value={type} 
                  options={
                   (GlobalState.curr_list.category === LIST_TYPES.MEDIA)?item_types_list.filter((type)=>type !== ITEM_TYPES.SHOPPING):item_types_list
                  } 
                  // variant='standard'
                  fullWidth={true}
                  stateset={setType}
                  name={'type'}
                  />
              </Grid>
              }

            {type === ITEM_TYPES.SHOPPING &&
              <Grid item xs={12} sx={{mb: 3 }}>
                <TextFieldWrapper label="Item amount" value="" name={'amount'} />
              </Grid>
            }

            
            <Grid item xs={12} sx={{mb: 3 }}>
                <TextFieldWrapper label="Item description" value="" name={'description'} multiline={true} rows={4}/>
            </Grid>
            

          <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mt:3,mb:2}}>
           <Typography variant='button'>
             Save
           </Typography>
         </Button>
        </Form>
      </Formik>
    
  )
}

export default ShoppingItemForm