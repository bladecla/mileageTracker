import React from 'react'

import { SignedInLinks, SignedOutLinks } from './Links';

const Navbar = props => {
  const { loggedIn, name, logout } = props;
  console.log(loggedIn)
  return (
    <div className="center">
      <div id="navbar">
        <div> 
          <h1 id="welcome" style={loggedIn ? {color: "whitesmoke"} : {display: "none"}}>{"Welcome, " + (loggedIn ? name : "Guest") + "!" }</h1>
        </div>
        {loggedIn ? <SignedInLinks logout={logout}/> : <SignedOutLinks />}
      </div>
    </div>
  )
}

export default Navbar