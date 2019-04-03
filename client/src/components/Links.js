import React from 'react'
import { NavLink } from 'react-router-dom'

export const SignedInLinks = props => {
  return (
    <nav id="nav" style={{width: "250px"}}>
      <NavLink className="navlink" to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className="navlink" to="/settings/account-settings">
        Settings
      </NavLink>
      <button className="submit" id="logout" onClick={props.logout}>Logout</button>
    </nav>
  )
}

export const SignedOutLinks = props => {
  return (
    <nav id="nav">
      <NavLink className="navlink" to={{pathname: "/login", state: { redirect: false }}}>
        Login
      </NavLink>
      <NavLink className="navlink" to="/register">
        Register
      </NavLink>
    </nav>
  )
}