import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVehicle, deleteVehicle, updateVehicle } from './../redux/actions/vehicleActions'

class ManageVehicles extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    prop: PropTypes.object
  }

  render() {
    const { vehicles } = this.props.vehicles;
    const cars = ['nishan', 'toyyola', 'miss a bshi']
    return (
      <div>
        <h3>Vehicles</h3>
        <hr/>
          <div>
            {cars.map((vehicle, idx) => (
              <div key={vehicle + idx}>
                <span>{vehicle}</span>
                <i className="fa fa-pencil icon" onClick={this.update}></i>
                <i className="fa fa-times icon" onClick={this.openDeleteModal}></i>
              </div>
            ))}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles
})

const mapDispatchToProps = { addVehicle, deleteVehicle, updateVehicle }


export default connect(mapStateToProps, mapDispatchToProps)(ManageVehicles)