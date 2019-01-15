import React from 'react'
import { NavLink } from 'react-router-dom'

export const SignedInLinks = props => {
  return (
    <nav id="nav" style={{width: "250px"}}>
      <NavLink className="navlink" to="/">
        Dashboard
      </NavLink>
      <NavLink className="navlink" to="/">
        Settings
      </NavLink>
      <button className="submit" onClick={props.logout}>Logout</button>
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