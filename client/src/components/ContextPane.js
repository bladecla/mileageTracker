import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TripForm from './TripForm';
import style from './styles/form.css'

const { form, body } = style;

export default class ContextPane extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    selected: PropTypes.array.isRequired
  }

  render() {
    const { selected } = this.props;
    const selSize = selected.length;
    return (
      <div id="context" className="pane" style={{textAlign: "center"}}>
        {selSize > 0
          ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <h2>{selSize + " trips selected"}</h2>
              {selSize === 1
                ? <div className="m10" style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TripForm isUpdate={true} {...selected[0]} />
                    <input className="submit m10" type="submit" form="trip" value="Done" />
                  </div>
                : <div className="m10" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <form id="batch-update" style={form}>
                      <input className="input" name="date" type="date" placeholder="" />
                      <select className="input" name="vehicle" >
                        <option value="">Select Vehicle</option>
                      </select>
                      <input className="submit m10" type="submit" form="trip" value="Done" />
                    </form>
                  </div>}
            </div>
          : "Select trip(s) to edit."
        }
      </div>
    )
  }
}
