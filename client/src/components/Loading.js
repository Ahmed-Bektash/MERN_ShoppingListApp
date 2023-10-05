import React, { useContext } from 'react'
import { Context } from '../logic/DataProvider';

function Loading() {
    const {GlobalState} = useContext(Context);
 //add spinner later
    return(
      <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}>
        <h1>Loading items please wait...</h1>
      </div>
    )
}

export default Loading