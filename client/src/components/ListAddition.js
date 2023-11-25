import React, { useState,useContext } from 'react';
import {Context} from '../logic/DataProvider';
import { Container } from '@mui/material';
import { AddList } from '../logic/List/ListProvider';
import CustomButton from './CustomButton';
import { ListForm } from './ListForm';


function ListAddition() {
const [toggleForm,SetToggleForm] = useState(false);
const {ListDispatch} = useContext(Context);

  return (
    <>
    <CustomButton 
        variant='outlined' 
        buttonStyles={{backgroundColor:theme=>theme.palette.secondary.main}}
        clickHandler={()=>SetToggleForm(!toggleForm)}
        text={'Add List'}
        textStyles={{color:theme=>theme.palette.primary.light}}
    />
    <Container sx={{mt:'1rem'}}>
        {toggleForm &&  <ListForm EndPointFunc={AddList} list_dispatch={ListDispatch} InitialValues={{_id:null,name:"", category:""}}/>}
    </Container>
    </>
  )
}

export default ListAddition