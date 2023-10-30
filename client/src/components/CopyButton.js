import React, {useContext, useState } from 'react';
import {Context} from '../logic/DataProvider';
import { CopyItems } from "../logic/Item/ItemProvider"
import CustomButton from "./CustomButton"
import SelectWrapper from './Forms/FormSelect';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import GenericModal from './GenericModal';

function CopyButton({items,copyIcon=undefined}) {
  const {ListState, GlobalDispatch} = useContext(Context);
  const list_names = ListState.ListsArray.map(list=>list.name).sort();
  const [enableSelect,setEnableSelect] = useState(false);
  const [listName,setListName] = useState(list_names[0]);
  
  const initialValues={
      list:"",
    } 
  
    const validation = Yup.object({
      list: Yup.string().required().oneOf(list_names),
    })

  return (
    <GenericModal 
      btn_style={{backgroundColor:'blue'}} 
      btn_txt={'Copy to'} 
      open={enableSelect} 
      toggle={()=>setEnableSelect(!enableSelect)}
      icon={copyIcon}
    >
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            const list_obj = ListState.ListsArray.find(item=>item.name === values.list);
            // console.log(items)
            CopyItems(list_obj._id,items,GlobalDispatch);
          }}
        >
          <Form>
            <Typography variant='h2'> Where would you like to copy? </Typography>
              <SelectWrapper 
                    value={listName} 
                    options={list_names} 
                    variant='standard'
                    fullWidth={true}
                    stateset={setListName}
                    name='list'
                    />

              <CustomButton
                    variant='outlined' 
                    buttonStyles={{backgroundColor:theme=>theme.palette.secondary.main, mt: 2}}
                    clickHandler={()=>setEnableSelect(!enableSelect)}
                    text={'Copy'}
                    textStyles={{color:'primary.light'}}
                    type='submit'
                  />
                  
            </Form>
        </Formik>
    </GenericModal>
  )
}

export default CopyButton