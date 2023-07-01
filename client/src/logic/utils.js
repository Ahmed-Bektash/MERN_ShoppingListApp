import {useEffect, useState} from 'react'

    
    
function getWindowDimensions() {

    if(typeof window === 'undefined'){
        return{
            WindowWidth:0,
            WindowHeight:0
        }
    }
    const { innerWidth: WindowWidth, innerHeight: WindowHeight } = window; //global object
    return {
        WindowWidth,
        WindowHeight
    };
  }
    
  //https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }