import React from 'react'
import PropTypes from 'prop-types';

const Pane = (props) => (
        <div className="pane">
            <div style={{display: "flex", justifyContent: "space-between"}}>    
                <h3>{props.title}</h3>
                <div onClick={props.addChild} className="icon"><i className="fa fa-plus-circle fa-2x"></i></div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {props.children.length ? props.children : "You have not added any trips yet."}
            </div>
        </div>
        );
    
Pane.propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.array,
        addChild: PropTypes.func.isRequired
    };

export default Pane;