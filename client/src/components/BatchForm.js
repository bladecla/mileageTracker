import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

const { form, body } = style;

export default class BatchForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="m10" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <form id="batch-update" style={form}>
          <input className="input" name="date" type="date" />
          <select className="input" name="vehicle" >
            <option value="">Select Vehicle</option>
          </select>
          <input className="submit m10" type="submit" form="trip" value="Update" />
        </form>
        <button className="submit m10">Delete</button>
      </div>
    )
  }
}
