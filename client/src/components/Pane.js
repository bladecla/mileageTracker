import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Pane extends Component {
    constructor(props){
        super(props);
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.array,
        addChild: PropTypes.func.isRequired
    }
    render() {
        let {title, children, addChild} = this.props;
        return (
        <div className="pane">
            <div style={{display: "flex", justifyContent: "space-between"}}>    
                <h3>{title}</h3>
                <div onClick={addChild} className="icon"><i className="fa fa-plus-circle fa-2x"></i></div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                {children.length ? children : "You have not added any trips yet."}
            </div>
        </div>
        )
    }
}
