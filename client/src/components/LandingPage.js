import React from 'react'
import LoggedRedirect from './LoggedRedirect';

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
      <button id="get-started">GET STARTED</button>
    </div>
  )
}

export default LandingPage
