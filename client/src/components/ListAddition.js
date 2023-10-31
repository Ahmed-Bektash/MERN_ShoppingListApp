import React, { useState,useContext } from 'react';
import {Context} from '../logic/DataProvider';
import { Button, Container, Typography } from '@mui/material';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import { list_categories, list_types } from '../config';
import Grid from '@mui/material/Grid';
import TextFieldWrapper from './Forms/FormTextField';
import { AddList } from '../logic/List/ListProvider';
import SelectWrapper from './Forms/FormSelect';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';

const ListCreationForm = ()=>{

  const [category,setCategory] = useState(list_categories[0].name);
  const [type,setType] = useState(list_types[0]);
  const {ListDispatch, ListState} = useContext(Context);
  
  const initialValues={
      name:"",
      category:"",
      type:""
    } 
  
    const validation = Yup.object({
      name: Yup.string().required('Required'),
      category: Yup.string().required('Required').oneOf(list_categories.map(list=>list.name)),
      type: Yup.string().required('Required').oneOf(list_types),
    })
  return(
      <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values, actions) => {
         // console.log(values)
        // alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        const newList = {
         name:values.name,
         category:values.category,
         type:values.type,
        }
        const list_exists = ListState.ListsArray.find(list=>((list.name === newList.name)&& (list.category === newList.category)));
        if(list_exists)
        {
          NotifyUser(NOTIFICATION_TYPE.WARN,"This list already exists for this category, please choose another name or category!");
        }
        else if(newList.name){ 
          //add amount
          AddList(ListDispatch,newList.name,newList.category,newList.type); //maybe await this to make it more robust
          actions.resetForm();
          NotifyUser(NOTIFICATION_TYPE.SUCCESS,"List Added successfully");

          }
      }}
    >
      <Form>

          <Grid item xs={12} sx={{mb: 2 }}>
           <TextFieldWrapper label="List name" value="" name={'name'} autoFocus={true}/>
          </Grid>

          <Grid item xs={12} sx={{mb: 2 }}>
              <SelectWrapper 
              label='Category' 
              value={category} 
              options={list_categories.map(list=>list.name)} 
              // variant='standard'
              fullWidth={true}
              stateset={setCategory}
              name='category'
              />
          </Grid>

          <Grid item xs={12} sx={{mb: 2 }}>
          <SelectWrapper 
              label='Type' 
              value={type} 
              options={list_types} 
              // variant='standard'
              fullWidth={true}
              stateset={setType}
              name='type'
              />
          </Grid>

        <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mt:1,mb:2}}>
         <Typography variant='button'>
           Save
         </Typography>
       </Button>
      </Form>
    </Formik>
  )
}
function ListAddition() {
const [toggleForm,SetToggleForm] = useState(false);

  return (
    <>
    <Button onClick={()=>SetToggleForm(!toggleForm)} variant='outlined' sx={{backgroundColor:theme=>theme.palette.secondary.main}}>
        <Typography variant='button' sx={{color:'primary.light'}}>
            Add List
        </Typography>
    </Button>
    <Container sx={{mt:'1rem'}}>
        {toggleForm &&  <ListCreationForm/>}
    </Container>
    </>
  )
}

export default ListAddition