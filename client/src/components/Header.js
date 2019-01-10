import React from 'react'
import Navbar from './Navbar'
const Header = () => {
  return (
    <header id="header" style={{width: "80%"}}>
      <div style={{fontSize: "2rem", marginTop: "0"}}><span>Trip</span><span style={{color: "goldenrod"}}>Tracker</span></div>
      <Navbar />
    </header>
  )
}

export default Header
