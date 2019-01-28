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
              <button className="submit" onClick={this.deselectAll}>Done</button>
            </div>
              {selSize === 1
                ? <div className="m10" style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TripForm isUpdate={true} {...selected[0]} />
                    <input className="submit m10" type="submit" form="trip" value="Update" />
                    <button className="submit m10">Delete</button>
                  </div>
                : <BatchForm/>}
            </div>
          : "Select trip(s) to edit."
        }
      </div>
    )
  }
}
