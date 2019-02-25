import React from 'react'
import LoggedRedirect from './LoggedRedirect';

const LandingPage = props => {
  return (
    props.loggedIn ? 
    <LoggedRedirect from="/" to="/dashboard" />
    :
    <div>
      HELLO
    </div>
  )
}

export default LandingPage
