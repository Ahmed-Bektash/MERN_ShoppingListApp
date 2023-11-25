import React, { useContext, useState } from 'react';
import {Context} from '../logic/DataProvider'

import { list_categories } from '../config';
import Grid from '@mui/material/Grid';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from './Forms/FormTextField';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';
import SelectWrapper from './Forms/FormSelect';
import CustomButton from './CustomButton';


export const ListForm = ({EndPointFunc,list_dispatch,InitialValues,closeModal=()=>{}})=>{

    const [category,setCategory] = useState(list_categories[0].name);
    const {ListState, GlobalDispatch} = useContext(Context);
    
    
      const validation = Yup.object({
        name: Yup.string().required('Required'),
        category: Yup.string().required('Required').oneOf(list_categories.map(list=>list.name))
      })
    return(
        <Formik
        initialValues={InitialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
           // console.log(values)
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          const newList = {
           name:values.name,
           category:values.category,
          }
          const list_exists = ListState.ListsArray.find(list=>((list.name === newList.name) && (list.category === newList.category))); 
          //list either exists exactly or has not changed in case of edit
          if(list_exists)
          {
            NotifyUser(NOTIFICATION_TYPE.WARN,"This list already exists for this category, please choose another name or category!");
          }
          else if(newList.name){ 
            const updated_list = {
                _id: InitialValues._id? InitialValues._id:null,
                name: newList.name,
                category: newList.category
            }
            EndPointFunc(list_dispatch,updated_list,GlobalDispatch); //maybe await this to make it more robust
            actions.resetForm();
            NotifyUser(NOTIFICATION_TYPE.SUCCESS,"Success!");
            closeModal();
  
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
                fullWidth={true}
                stateset={setCategory}
                name='category'
                />
            </Grid>
            <CustomButton 
                type='submit'
                variant='contained' 
                buttonStyles={{backgroundColor:theme=>theme.palette.secondary.main,mt:1,mb:2}}
                text={'Save'}
                textStyles={{color:theme=>theme.palette.primary.light}}
            />
        </Form>
      </Formik>
    )
  }