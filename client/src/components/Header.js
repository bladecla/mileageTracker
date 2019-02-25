import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="header">
      <Link to="/">
        <div id="logo">
          <span style={{color: "whitesmoke"}}>Trip</span>
          <span style={{color: "goldenrod"}}>Tracker</span>
        </div>
      </Link>
    </header>
  )
}

export default Header
