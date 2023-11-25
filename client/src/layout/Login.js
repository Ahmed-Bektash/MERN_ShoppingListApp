import { useContext, useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link,useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextFieldWrapper from '../components/Forms/FormTextField';
import CheckBoxWrapper from '../components/Forms/FormCheckBox';
import {Context,fetchUserData} from '../logic/DataProvider.js'
import { LoginUser } from '../logic/User/UserProvider';
import { isAuthenticated } from '../logic/utils';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_REF } from '../config';
import Logout from '../components/Logout';
import DarkModeButton from '../components/DarkModeButton'

export default function Login() {
  const theme = useTheme();
  const {GlobalState,UserState,UserDispatch,ItemDispatch,ListDispatch,GlobalDispatch} = useContext(Context);
  const [signedIn, setSignedIn] = useState(false)
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if(signedIn)
    {
      fetchUserData(GlobalDispatch,ListDispatch,ItemDispatch,UserDispatch,UserState.token);
      setSignedIn(false)
      navigate("/user",{state:{from:PAGE_REF.LOGIN}}); 
    }
  
    
  }, [signedIn])
  

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
    password:'',
    // keepLoggedIn: false
  }
  const validation = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
    // keepLoggedIn:Yup.boolean()
  })

  return (
      <Container component="main" maxWidth="xs">

          {(!isAuthenticated(UserState))?
          <Box sx={style}>
            <Container sx={{display:'flex',justifyContent:'center'}}>
              <DarkModeButton />
            </Container>
          <Typography component="h1" variant="h5" align='center' mb={3}>
            Log In
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={async (values, actions) => {
                // console.log(values)
              // alert(JSON.stringify(values, null, 2));
              const auth = await LoginUser(UserDispatch,values.email,values.password);
              if(auth)
              {
                actions.setSubmitting(false);
                setSignedIn(true);
              }
              else{
                actions.resetForm();
              }
              
            }}
          >
         <Form>
           
            <Grid item xs={12} sx={{mb: 3 }}>
              <TextFieldWrapper label={'Email'}  name={'email'}/>
             </Grid>
              
             <Grid item xs={12} sx={{mb: 3}}>
              <TextFieldWrapper label={'Password'}  name={'password'} type={'password'}/>
             </Grid>

             <Grid item xs={12} >
                <CheckBoxWrapper label='Remember me'  name='keepLoggedIn'/>
             </Grid>
             
           <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mt:3,mb:2}}>
            <Typography variant='button'>
              Submit
            </Typography>
            </Button>
          </Form>
        </Formik>
        <Grid container justifyContent="center">
          <Grid item>
            <Link 
            to={"../register"} 
            style={{textDecoration:"none"}} 
            state={{ from: PAGE_REF.LOGIN}}
            >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Don&apos;t have an account? Sign up
              </Typography>
            </Link>
          </Grid>
        </Grid>
          <Link 
          to={"../"} 
          style={{textDecoration:"none"}} 
          state={{ from: PAGE_REF.LOGIN}}
          >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Go to Home
              </Typography>
          </Link>
        </Box>
        :
        <>
          
          <Box sx={{display:"flex" , alignItems:"center", justifyContent:"center", flexDirection:"column", height:"80vh"}}>

            <Typography variant='body1'>
                You are already logged in...
            </Typography>

            <Container sx={{display:"flex" , alignItems:"center", justifyContent:"center", gap: 2, mt: 2}}>

              <Link 
                to={"../"} 
                style={{textDecoration:"none"}} 
                state={{ from: PAGE_REF.LOGIN}}
                >
                  <Button variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}> Go to Home </Button>
                </Link>
              
                <Logout/>
              
              </Container>
              
            </Box>

        </>
      }
      
      </Container>
  );
}