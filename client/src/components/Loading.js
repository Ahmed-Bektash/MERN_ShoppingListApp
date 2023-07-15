import React, { useContext } from 'react'

function Loading() {
    const {GlobalState} = useContext();

 if(GlobalState.loading){
    return(
      <div style ={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'10rem'}}><h1>Loading items please wait...</h1></div>
    )
  }
}

export default Loading