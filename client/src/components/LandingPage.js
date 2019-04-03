import React from 'react'
import LoggedRedirect from './LoggedRedirect';
import { Link } from 'react-router-dom'

const LandingPage = props => {
  return (
    props.loggedIn ? 
    <LoggedRedirect from="/" to="/dashboard" />
    :
    <div id="splash" className="center" style={{flexDirection: "column", alignItems: "center"}}>
      <div id="splash-logo">
          <span style={{color: "whitesmoke"}}>Trip</span>
          <span style={{color: "goldenrod"}}>Tracker</span>
      </div>
      <div>
        <h1 className="tagline">Simple, effective mileage tracking for commercial drivers.</h1>
      </div>
      <Link to="/register"><button id="get-started">SIGN UP</button></Link>
    </div>
  )
}

export default LandingPage
