import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{position: "fixed",zIndex: 1000}}>
      <NavLink to={{
        pathname: "/login",
        state: { redirect: false }
        }}>Login</NavLink>
      <NavLink to="/">Dashboard</NavLink>
    </div>
  )
}

export default Navbar


