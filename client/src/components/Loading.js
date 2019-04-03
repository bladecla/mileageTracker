import React from 'react'
import Header from './Header';

const Loading = () => {
  return (
    <div>
      <div id="dash-bg"/>
      <Header/>
      <div className="dash">
        <h1 style={{color: "whitesmoke"}}>Loading...</h1>
      </div>
    </div>
  )
}

export default Loading
