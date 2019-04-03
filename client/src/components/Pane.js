import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Pane extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      maxScroll: false
    }
  }
  
  static propTypes = {
    children: PropTypes.array,
    addChild: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired
  }

  onScroll = ({ target }) => {
    const { clientHeight, scrollHeight, scrollTop } = target;
    const isMaxScrollReached = (scrollHeight - clientHeight === scrollTop) || scrollHeight === clientHeight;

    if ( this.state.maxScroll !== isMaxScrollReached ) this.setState({ maxScroll: isMaxScrollReached });
  }

  render() {
    const {addChild, selectAll, children, checked} = this.props;
    const { maxScroll } = this.state;

    console.log(maxScroll)
    return (
      <div id="trip-pane" className="pane">
        <div  style={{display: "flex", justifyContent: "space-between", minHeight: "30px", marginBottom: "1rem", paddingRight: "17px"}}>
          <div style={{display: "flex", alignItems: "flex-end"}}>
            <input type="checkbox" name="selectAll" onChange={selectAll} checked={checked}/>    
            <h3 style={{paddingLeft: "20px"}}>Trips</h3>
          </div>
          <div onClick={addChild} className="icon" style={{display: "flex"}}>
            <span style={{marginRight: "1em", alignSelf: "flex-end"}}>Add Trips</span>
            <i className="fa fa-plus-circle fa-2x"></i>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", width: "100%", paddingRight: "517px", overflowY: "scroll"}} onScroll={this.onScroll}>
          {children.length ? children : `You have not added any trips yet.`}
        </div>
        {!maxScroll &&
          <div id="scroll">
            <i className="fa fa-chevron-down fa-4x"></i>
          </div>
        }
      </div>
    )
  }
};

export default Pane;