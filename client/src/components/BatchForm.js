import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { batchDeleteTrips, batchUpdateTrips } from './../redux/actions/tripActions'
import style from './styles/form.css'
import { JSONtoDateObject } from '../helpers';
import DeleteModal from './DeleteModal';
import ErrorMsg from './ErrorMsg';

const { form } = style;

class BatchForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showDeleteModal: false,
      updates: {},
      errors: []
    }
  }
  
  static propTypes = {
    batchDeleteTrips: PropTypes.func.isRequired,
    batchUpdateTrips: PropTypes.func.isRequired,
  }

  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal })

  onVehicleChange = ({ target }) => {
    const { updates } = this.state;
    this.setState({updates: {...updates, [target.name]: target.value}, errors: [] });
  }
  
  onBusinessChange = ({ target }) => {
    const { updates } = this.state;
    const { value } = target;
    if (value) return this.setState({ updates: {...updates, isBusiness: value === "true" }, errors: [] });
    this.setState({ updates: {...updates, isBusiness: "" }})
  }

  onDateChange = ({ target }) => {
    const { updates } = this.state;
    console.log(target.value)
    this.setState({ updates: {...updates, date: JSONtoDateObject(target.value)}, errors: [] })
  }

  validate = () => {
    const { errors, updates } = this.state;
    const { date, vehicle, isBusiness } = updates;

    // do not submit if all fields are blank
    if (!(isBusiness || date || vehicle ) && isBusiness !== false) return console.log("All fields blank.");

    if (date && date.getTime() > Date.now()) {
      this.setState({ errors: [
        ...errors,
        <ErrorMsg key={"err"+date.getTime()}>
          Date cannot be in the future.
        </ErrorMsg>
        ]
      })
      return false;
    }
    if (vehicle && vehicle.length > 32) {
      this.setState({ errors: [
        ...errors,
        <ErrorMsg key={"err"+vehicle+vehicle.length}>
          Vehicle nickname cannot exceed 32 characters.
        </ErrorMsg>
        ]
      })
      return false;
    }
    this.setState({ errors: [] })
    return true;
  }

  submit = e => {
    e.preventDefault();
    if (!this.validate()) return;
    const { selected, batchUpdateTrips, vehicles } = this.props;
    const tripIds = selected.map(trip => trip._id);
    let updates = {...this.state.updates};
    let isVehicleNew;

    for (let key in updates){
      let value = updates[key];
      if (!value && value !== false) delete updates[key];
    } 

    console.log("sending: ", updates)
    
    if (updates.vehicle) isVehicleNew = !vehicles.vehicles.includes(updates.vehicle);
    batchUpdateTrips(tripIds, updates, isVehicleNew)
  }
  
  delete = e => {
    e.preventDefault();
    const tripIds = this.props.selected.map(trip => trip._id);
    this.props.batchDeleteTrips(tripIds)
  }

  render() {
    const { vehicles } = this.props.vehicles;
    const { errors, showDeleteModal } = this.state;

    return (
      <div className="m10" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {errors}
        <form id="batch-update" onSubmit={this.submit} style={form}>
          <input className="input" onChange={this.onDateChange} name="date" type="date" />
          <input className="input" onChange={this.onVehicleChange} list="vehicle-list" name="vehicle" placeholder="Select Vehicle" maxLength="32" />
          <datalist className="input" id="vehicle-list">
            {vehicles.map((vehicle, idx) =>
              <option key={vehicle + idx} value={vehicle}>{vehicle}</option>
            )}
          </datalist>
          <select className="input" name="isBusiness" onChange={this.onBusinessChange} defaultValue="">
            <option value="">Select Classification</option>
            <option value={true}>Business</option>
            <option value={false}>Personal</option>
          </select>
          <input className="submit m10" type="submit" value="Update" />
        </form>
        <button className="submit m10" onClick={this.toggleDeleteModal}>Delete</button>
        {showDeleteModal &&
        <DeleteModal resourceName={"These Trips"} close={this.toggleDeleteModal} onSubmit={this.delete} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
  selected: state.trips.selected
})

const mapDispatchToProps = { batchDeleteTrips, batchUpdateTrips }

export default connect(mapStateToProps, mapDispatchToProps)(BatchForm);