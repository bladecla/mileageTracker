import React from 'react'
import PropTypes from 'prop-types'

const Modal = props => {
    return (
        <div className="modal">
      <header style={headerStyle}>
          <h2>{props.title}</h2>
          <button onClick={props.close} style={closeStyle}>&times;</button>
      </header>
      <footer></footer>
    </div>
  )
}

Modal.propTypes = {
    
}

//inner styles

const closeStyle = {
    float: "right",
    backgroundColor: "inherit",
    color: "gray",
    borderRadius: "5px",
    border: "2px solid gray",
    fontSize: "1rem",
    alignSelf: "center"
}

const headerStyle = {
    display: "flex", 
    justifyContent: "space-between", 
    padding: "20px",
    
}


export default Modal;
