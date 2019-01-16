import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

const { plus, subform, addCar } = style;

export default class AddVehicle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       newVehicle: ""
    }
  }
  
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    addVehicle: PropTypes.func.isRequired
  }

  onChange = ({ target }) => this.setState({ newVehicle: target.value })

  submit = () => {
    const { newVehicle } = this.state;
    if (newVehicle) this.props.addVehicle(newVehicle);
    this.setState({newVehicle: ""});
    this.props.toggle();
  }

  render() {
    const { show, toggle } = this.props;
    return (
      show ?   
          <div style={subform}>
              <input onChange={this.onChange} type="text" name="new-vehicle" placeholder="Nickname (e.g. 'Nissan')"  />
              <i onClick={this.submit} className="icon fa fa-plus-circle" style={plus}></i>
          </div>     
          :   
          <div className="icon" onClick={toggle} style={addCar}>
              <i className="fa fa-plus-circle" style={plus}></i><span>Add Vehicle</span>
          </div>
    )
  }
}
