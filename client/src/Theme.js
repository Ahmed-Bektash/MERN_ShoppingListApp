import { createTheme } from '@mui/material/styles';

export const colourPalette={
                            LIGHT_BCKRND : '#EAEAEA',
                            DARK_BCKRND:'#AEAEAE',
                            CHARCOAL : '#302E2F',
                            TEAL:'#0A9279',
                            ERROR:'#ff1744'
                            }

 export const theme = createTheme({
          palette: {
            mode:'light',
            primary: {
              main: colourPalette.CHARCOAL,
              dark:colourPalette.DARK_BCKRND,
              light:colourPalette.LIGHT_BCKRND
              
            },
            secondary: {
              main: colourPalette.TEAL,
              dark:colourPalette.TEAL,
              light: colourPalette.TEAL
            },
            error: {
              main: colourPalette.ERROR,
            },
          },
          typography:{
            h1:{
              fontSize:'1.4rem',
              fontWeight:400,
              margin: '1rem 0'
            },
            h2:{
              fontSize: '1.2rem',
              fontWeight:400,
              margin: '1rem 0'
            }
          }
          // status:{
          //   danger:red[200]
          // }
        });