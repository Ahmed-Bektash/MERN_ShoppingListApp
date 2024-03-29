import { useContext, useState, useEffect} from 'react';
import {Context, fetchUserData} from '../logic/DataProvider.js'
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextFieldWrapper from '../components/Forms/FormTextField';
import CheckBoxWrapper from '../components/Forms/FormCheckBox.js';
import { RegisterUser } from '../logic/User/UserProvider';
import { PAGE_REF } from '../config.js';
import DarkModeButton from '../components/DarkModeButton'





export default function SignUp() {
  const theme = useTheme();
  const {GlobalState,GlobalDispatch,UserState,UserDispatch,ListDispatch,ItemDispatch} = useContext(Context);
  const [signedUp, setSignedUp] = useState(false)
  const navigate = useNavigate();

    
  useEffect(() => {
    if(signedUp)
    {
      fetchUserData(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch,UserState.token);
      setSignedUp(false)
      navigate("/user",{state:{from:PAGE_REF.SIGNUP}}); 
    }
  },[signedUp]);

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
    email:'',
    username:'',
    password:'',
    // termsAccepted: false
  }
  const validation = Yup.object({
    email: Yup.string().email().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    termsAccepted:Yup.boolean().isTrue("Please agree to the terms and conditions")
  })

  return (
      <Container component="main" maxWidth="xs">
          <Box sx={style}>
          <Container sx={{display:'flex',justifyContent:'center'}}>
              <DarkModeButton />
            </Container>
          <Typography component="h1" variant="h5" align='center' mb={3}>
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={async (values, actions) => {
                // console.log(values)
              actions.setSubmitting(false);
              const auth = await RegisterUser(UserDispatch,values.username,values.email,"normal",values.password);
              if(auth)
              {
                actions.setSubmitting(false);
                setSignedUp(true);
              }
              else{
                actions.resetForm();
              }
              
            }}
          >
         <Form>
            <Grid item xs={12} sx={{mb: 3 }}>
              <TextFieldWrapper label={'Email'}  name={'email'} />
             </Grid>

             <Grid item xs={12} sx={{mb: 3 }}>
              <TextFieldWrapper label={'User Name'}  name={'username'} />
             </Grid>
              
             <Grid item xs={12} sx={{mb: 3 }}>
              <TextFieldWrapper label={'Password'}  name={'password'} type={'password'}/>
             </Grid>

             <Grid item xs={12} sx={{mb: 0 }}>
                <CheckBoxWrapper label='I agree to the terms and conditions'  name='termsAccepted'/>
             </Grid>
             
           <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}>
            <Typography variant='button'>
              Submit
            </Typography>
          </Button>
         </Form>
       </Formik>
        <Grid container justifyContent="center">
          <Grid item>
            <Link 
            to={"../login"} 
            style={{textDecoration:"none"}} 
            state={{ from: PAGE_REF.SIGNUP}}
            >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Already have an account? Sign in
              </Typography>
            </Link>
        </Grid>
          </Grid>
          <Link 
          to={"../"} 
          style={{textDecoration:"none"}} 
          state={{ from: PAGE_REF.SIGNUP}}
          >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Go to Home
              </Typography>
            </Link>
        </Box>
      </Container>
  );
}
