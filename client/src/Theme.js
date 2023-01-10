import React, { useContext } from 'react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import {Context} from './logic/DataProvider'


export const colourPalette={
                            LIGHT_BCKRND : '#EAEAEA',
                            DARK_BCKRND:'#AEAEAE',
                            CHARCOAL : '#302E2F',
                            TEAL:'#0A9279',
                            ERROR:'#ff1744',
                            NOT_FOUND: '#aaaaaa'
                          }


export default function Layout({children}) {

  const {darkMode} = useContext(Context);

  //https://mui.com/system/the-sx-prop/
  //https://mui.com/system/styled/
const theme = createTheme({
          palette: {
            mode:darkMode?'dark':'light',
            primary: {
              main: colourPalette.CHARCOAL,
              dark:colourPalette.DARK_BCKRND,
              light:colourPalette.LIGHT_BCKRND
              
            },
            secondary: {
              main: colourPalette.TEAL,
              dark:colourPalette.TEAL,
              light: colourPalette.NOT_FOUND
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
          },
          //https://mui.com/customization/theme-components/#global-style-overrides
          components: {
            MuiLink: {
              defaultProps: {
                underline: 'hover',
              }
            },
            MuiDrawer:{
              styleOverrides:{
                paper:{
                  backgroundColor:colourPalette.CHARCOAL
                }
              }
            }
          }
          // status:{
          //   danger:red[200]
          // }
          
        });
        
        return <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </>;
}