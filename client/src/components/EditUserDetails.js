import React, { useContext, useState } from 'react'
import {Context} from '../logic/DataProvider'
import GenericModal from './GenericModal';
import { colourPalette } from '../Theme';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from './Forms/FormTextField';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification';
import CustomButton from './CustomButton';
import { EditUser } from '../logic/User/UserProvider';

function UserEditForm({userName,toggleModal}){
    const {UserDispatch,UserState} = useContext(Context);
    const validation = Yup.object({
        name: Yup.string(),
        // email: Yup.string()
      })

    const InitialValues = { //take from props later
        name:userName,
        // email:userEmail,
    }
    return(
        <Formik
        initialValues={InitialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
           // console.log(values)
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          const newUser = {
            name:values.name,
            // email:values.email,
           }
           if((newUser.name === userName) /*&& (newUser.email === userEmail)*/)
           {
             NotifyUser(NOTIFICATION_TYPE.WARN,"You did not make any changes to your details!");
           }
           else if(newUser.name){ 
             EditUser(UserDispatch,newUser);
             //  actions.resetForm();
            }
            toggleModal();
          
        }}
      >
        <Form>
  
            <Grid item xs={12} sx={{mb: 2 }}>
             <TextFieldWrapper label="Name" value="" name={'name'} autoFocus={true}/>
            </Grid>

            {/* <Grid item xs={12} sx={{mb: 2 }}>
             <TextFieldWrapper label="Email" value="" name={'email'} autoFocus={true}/>
            </Grid> */}

            <Grid item xs={12} sx={{mb: 2}}> 
                <CustomButton 
                    variant='contained' 
                    buttonStyles={{backgroundColor:theme=>theme.palette.warning.main,mt:1}}
                    text={'Change password'}
                    textStyles={{color:theme=>theme.palette.primary.light}}
                    clickHandler={()=>{EditUser(UserDispatch,UserState,"verify")}}
                />

                <CustomButton 
                    variant='contained' 
                    buttonStyles={{backgroundColor:theme=>theme.palette.error.main,mt:1,ml:2}}
                    text={'Delete account'}
                    textStyles={{color:theme=>theme.palette.primary.light}}
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

function EditUserDetails() {
    const {UserState} = useContext(Context);
    const [IsModalOpen,SetIsModalOpen] = useState(false);
    function toggle(){
        SetIsModalOpen(!IsModalOpen);
    }
return(
    <GenericModal 
    btn_style={{backgroundColor:colourPalette.TEAL}} 
    btn_txt={'Edit your details'} 
    open={IsModalOpen} 
    toggle={toggle}
    >
        <Typography variant='h2'> Here, you can change your details </Typography>
        <UserEditForm userName={UserState.username} toggleModal={toggle}/>
       
    </GenericModal>
    );
}

export default EditUserDetails