import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

export default class TripForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired
  }

  log = (e) => {
  e.preventDefault();
  console.log(e.target);
  }

  render() {
    return (
        <React.Fragment>
            
            <div style={style.body}>    
                <form id="trip" onSubmit={this.log} style={style.form}>
                    <input className="input" type="tel" name="start" placeholder="Starting mileage"/>
                    <input className="input" type="tel" name="end" placeholder="Ending mileage"/>
                    <div>
                        <label htmlFor="isBusiness">Business</label>
                        <input type="checkbox" name="isBusiness" defaultChecked/>
                    </div>
                </form>
            </div>    
            
        </React.Fragment>
    )
  }
}
