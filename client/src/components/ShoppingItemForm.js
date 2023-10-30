import React, { useContext } from 'react';
import {Context} from '../logic/DataProvider'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from './Forms/FormTextField';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';

function ShoppingItemForm(props) {
    const {AddItem,CloseModal,item_dispatch} = props
    const {GlobalState , ItemState} = useContext(Context);
    // const [itemExists, setItemExists] = useState(false)
    const initialValues={
        name:"",
        amount:1
      } 

      const validation = Yup.object({
        name: Yup.string().required('Required'),
        amount: Yup.number().required('Required').positive("Please input positive numbers only").typeError("Please input numbers only here"),
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
           name:values.name,
           amount:values.amount,
          }

          if(newItem.name){ 
            const existingItem = ItemState.ItemsArray.find((item)=>(newItem.name.toLowerCase()===item.name.toLowerCase()))
            if(existingItem)
            {
              NotifyUser(NOTIFICATION_TYPE.WARN,"Note! This Item already exists! we did not add it but you can update it");
            }
            else
            {
              //add amount
              AddItem(item_dispatch,newItem.name,newItem.amount,GlobalState.curr_list._id,null);

              
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

            <Grid item xs={12} sx={{mb: 3 }}>
             <TextFieldWrapper label="Item amount" value="" name={'amount'} />
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