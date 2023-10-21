import React, { useContext } from 'react'
import { Context } from '../logic/DataProvider';
import ClipLoader from "react-spinners/ClipLoader";
import {useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

function Loading() {
    // const {GlobalState} = useContext(Context);
    const theme = useTheme();

    const loading_style = {
      marginTop:'10rem',
      margin: "0 auto",
    }
    const container_styles = {
      display:'flex',
      flexDirection:"column",
      justifyContent:'center', 
      alignItems:'center',
      height:'80vh'
    }
    return(
      <Container sx={container_styles}>
        <ClipLoader
          color={theme.palette.secondary.main}
          loading={true}
          cssOverride={loading_style}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Typography mt={5} variant='h1'> Loading... </Typography>
      </Container>
    )
}

export default Loading