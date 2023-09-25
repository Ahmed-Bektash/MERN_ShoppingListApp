import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextFieldWrapper from '../components/Forms/FormTextField';
// import CheckBoxWrapper from '../components/Forms/FormCheckbox';
import { useContext } from 'react';
import {Context, ToggleDarkMode} from '../logic/DataProvider.js'



export default function Login() {
  const theme = useTheme();
  const {GlobalState,GlobalDispatch} = useContext(Context);

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
          <Box sx={style}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align='center' mb={3}>
            Log In
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={async (values, actions) => {
                // console.log(values)
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
              
            }}
          >
         <Form>
           
            <Grid item xs={12} sx={{mb: 3 }}>
              <TextFieldWrapper label={'Email'}  name={'email'}/>
             </Grid>
              
             <Grid item xs={12} sx={{mb: 3}}>
              <TextFieldWrapper label={'Password'}  name={'password'}/>
             </Grid>

             {/* <Grid item xs={12} >
                <CheckBoxWrapper label='Remember me'  name='keepLoggedIn'/>
             </Grid> */}
             
           <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mt:3,mb:2}}>
            <Typography variant='button'>
              Submit
            </Typography>
          </Button>
         </Form>
       </Formik>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to={"../register"} style={{textDecoration:"none"}} >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Don&apos;t have an account? Sign up
              </Typography>
            </Link>
        </Grid>
          </Grid>
          <Link to={"../"} style={{textDecoration:"none"}} >
              <Typography variant='body1' sx={{color:theme.palette.secondary.main}}>
                Go to Home
              </Typography>
            </Link>
        </Box>
      </Container>
  );
}