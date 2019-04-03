import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TripForm from './TripForm';
import BatchForm from './BatchForm';

export default class ContextPane extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    selected: PropTypes.array.isRequired,
    selectAll: PropTypes.func.isRequired
  }

  deselectAll = () => this.props.selectAll(false);

  render() {
    const { selected } = this.props;
    const selSize = selected.length;
    return (
      <div id="context" className="pane" style={{textAlign: "center"}}>
        {selSize > 0
          ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                <h2>{selSize + " trips selected"}</h2>
                <button className="plain submit" onClick={this.deselectAll}>Clear</button>
              </div>
              {selSize === 1
                ? <div className="m10" style={{width: "120%", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TripForm isUpdate={true} {...selected[0]} />
                    <input className="long submit m10" type="submit" form="trip" value="Update" />
                    <button className="long plain submit m10">Delete</button>
                  </div>
                : <BatchForm/>}
            </div>
          : <div style={{paddingTop: "10%"}}>
              <h3>Select trips to edit.</h3>
              <div >
                <i className="fa fa-tachometer fa-5x" style={{color: "gray"}}></i>
              </div>
            </div>
        }
      </div>
    )
  }
}
