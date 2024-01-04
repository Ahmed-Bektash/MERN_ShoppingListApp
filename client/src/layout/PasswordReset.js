import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextFieldWrapper from '../components/Forms/FormTextField';
import {Context} from '../logic/DataProvider.js'
import 'react-toastify/dist/ReactToastify.css';
import DarkModeButton from '../components/DarkModeButton'
import { EditUser, ValidateToken } from '../logic/User/UserProvider.js';
import CustomButton from '../components/CustomButton.js';
import { NOTIFICATION_TYPE, NotifyUser } from '../logic/Notification.js';
import { PAGE_REF } from '../config.js';

function PasswordReset() {
    const {GlobalState,UserDispatch} = useContext(Context);
    const [tokenConfirmed,setTokenConfirmed] = useState(false);
    const [userID,setuserID] = useState(undefined);
    let {resetToken} = useParams();
    const navigate = useNavigate();
    const confirmToken = async ()=>{
        const user_id = await ValidateToken(resetToken);
        if(user_id)
        {
            NotifyUser(NOTIFICATION_TYPE.SUCCESS,"User validated, you can change password now");
            setTokenConfirmed(true);
            setuserID(user_id);
        }
        else
        {
            NotifyUser(NOTIFICATION_TYPE.ERR,"Link expired or incorrect, please try again");
            setTokenConfirmed(false);
            setuserID(undefined);
        }
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: GlobalState.darkMode?'primary.main':'background.paper',
      boxShadow: 15,
      p: 4,
      display:'flex',
      flexDirection: 'column',
      alignItems:'center'
    };
  
    const initialValues={
      newPassword:'',
      confirmPassword:'',
    }
    const validation = Yup.object({
        newPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    })
  
    return (
        <Container component="main" maxWidth="xs">
            {
            tokenConfirmed?
                <Box sx={style}>
                    <Container sx={{display:'flex',justifyContent:'center'}}>
                        <DarkModeButton />
                    </Container>
                        <Typography component="h1" variant="h5" align='center' mb={3}>
                            Password change
                        </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validation}
                        onSubmit={async (values, actions) => {
                            //   console.log(values)
                            // alert(JSON.stringify(values, null, 2));
                            const newData = {
                                id:userID,
                                password:values.newPassword,
                            }
                            await EditUser(UserDispatch,newData,"password");
                            actions.setSubmitting(false);
                            actions.resetForm();
                            NotifyUser(NOTIFICATION_TYPE.SUCCESS,"Password has been changed successfully");
                            navigate("/user",{state:{from:PAGE_REF.CHANGE_PASS}}); 
                            

                        }}
                    >
                        <Form>
                        
                            <Grid item xs={12} sx={{mb: 3 }}>
                                <TextFieldWrapper label={'New Password'}  name={'newPassword'} type={'password'}/>
                            </Grid>
                                
                            <Grid item xs={12} sx={{mb: 3}}>
                                <TextFieldWrapper label={'Confirm new password'}  name={'confirmPassword'} type={'password'}/>
                            </Grid>
                            
                            <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}>
                                <Typography variant='button'>
                                    Change the password
                                </Typography>
                            </Button>
                        </Form>
                    </Formik>
                </Box>
        :
        <Box sx={style}>
            <CustomButton 
                variant='contained' 
                buttonStyles={{backgroundColor:theme=>theme.palette.warning.main,mt:1}}
                text={'Click to confirm you want to change password'}
                textStyles={{color:theme=>theme.palette.primary.light}}
                clickHandler={confirmToken}
                />
        </Box>
        }
            
        
        </Container>
    );
}

export default PasswordReset