import React from 'react'

import { SignedInLinks, SignedOutLinks } from './Links';

const Navbar = props => {
  const { loggedIn, name, logout } = props;
  console.log(loggedIn)
  return (
    <div className="center">
      <div id="navbar">
        <h1 id="welcome" style={loggedIn ? {color: "whitesmoke"} : {visibility: "hidden"}}>{"Welcome, " + (loggedIn ? name : "Guest") + "!" }</h1>
        {loggedIn ? <SignedInLinks logout={logout}/> : <SignedOutLinks />}
      </div>
    </div>
  )
}

export default Navbar