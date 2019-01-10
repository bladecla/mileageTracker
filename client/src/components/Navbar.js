import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div id="navbar">
      <NavLink className="navlink" to={{
        pathname: "/login",
        state: { redirect: false }
        }}>Login</NavLink>
      <NavLink className="navlink" to="/">Dashboard</NavLink>
    </div>
  )
}

export default Navbar


