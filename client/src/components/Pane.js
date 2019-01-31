import React from 'react'
import PropTypes from 'prop-types';

const Pane = (props) => {
  const {addChild, selectAll, children, checked} = props;
  return (
    <div id="trip-pane" className="pane">
      <div  style={{display: "flex", justifyContent: "space-between", minHeight: "30px", marginBottom: "1rem"}}>
        <input type="checkbox" name="selectAll" onChange={selectAll} checked={checked}/>    
        <h3>Trips</h3>
        <div onClick={addChild} className="icon" style={{display: "flex"}}>
          <span style={{marginRight: "1em", alignSelf: "center"}}>Add Trips</span>
          <i className="fa fa-plus-circle fa-2x"></i>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "column", width: "100%", paddingRight: "500px", overflowY: "scroll"}}>
        {children.length ? children : `You have not added any trips yet.`}
      </div>
      <hr/>
    </div>
  )
};
    
Pane.propTypes = {
  children: PropTypes.array,
  addChild: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired
};

export default Pane;