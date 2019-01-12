import React from 'react'
import PropTypes from 'prop-types';

const Pane = (props) => (
  <div id="trip-pane">
    <div className="pane" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", minHeight: "30px", marginBottom: "1rem"}}>    
      <h3>Trips</h3>
      <div onClick={props.addChild} className="icon" style={{display: "flex"}}>
        <span style={{marginRight: "1em", alignSelf: "center"}}>Add Trips</span>
        <i className="fa fa-plus-circle fa-2x"></i>
      </div>
    </div>
    <div style={{display: "flex", flexDirection: "column", overflowY: "scroll"}}>
      {props.children.length ? props.children : `You have not added any trips yet.`}
    </div>
  </div>
  );
    
Pane.propTypes = {
  children: PropTypes.array,
  addChild: PropTypes.func.isRequired
};

export default Pane;