import React from 'react'
import PropTypes from 'prop-types';

const Pane = (props) => (
  <div className="pane">
    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>    
      <h3>{props.title}</h3>
      <div onClick={props.addChild} className="icon" style={{display: "flex"}}>
        <span style={{marginRight: "1em", alignSelf: "center"}}>{"Add " + props.title}</span>
        <i className="fa fa-plus-circle fa-2x" style={{cursor: "pointer"}}></i>
      </div>
    </div>
    <div style={{display: "flex", flexDirection: "column"}}>
      {props.children.length ? props.children : `You have not added any ${props.title.toLowerCase()} yet.`}
    </div>
  </div>
  );
    
Pane.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array,
  addChild: PropTypes.func.isRequired
};

export default Pane;