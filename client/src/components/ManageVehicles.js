import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVehicle, deleteVehicle, updateVehicle } from './../redux/actions/vehicleActions'
import Vehicle from './Vehicle';
import AddVehicle from './AddVehicle';


class ManageVehicles extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showVehicleForm: false
    }
  }
  
  static propTypes = {
    prop: PropTypes.object
  }

  toggleVehicleForm = () => this.setState({ showVehicleForm: !this.state.showVehicleForm })

  render() {
    const { showVehicleForm } = this.state;
    const { vehicles } = this.props.vehicles;
    const { deleteVehicle, updateVehicle, addVehicle } = this.props;
    return (
      <div>
        <h3>Vehicles</h3>
        <hr/>
        <p>Add or remove vehicles, or edit nicknames below.</p>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            {vehicles.map((vehicle, idx) => (
              <Vehicle key={vehicle + idx} vehicle={vehicle} delete={deleteVehicle} update={updateVehicle}/>
            ))}
          </div>
          <div>
            <AddVehicle show={showVehicleForm} toggle={this.toggleVehicleForm} addVehicle={addVehicle}/>
          </div>
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