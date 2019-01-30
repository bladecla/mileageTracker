import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { batchDeleteTrips, batchUpdateTrips } from './../redux/actions/tripActions'
import style from './styles/form.css'
import { JSONtoDateObject } from '../helpers';
import DeleteModal from './DeleteModal';

const { form, body } = style;

class BatchForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showDeleteModal: false,
      updates: {}
    }
  }
  
  static propTypes = {
    batchDeleteTrips: PropTypes.func.isRequired,
    batchUpdateTrips: PropTypes.func.isRequired,
  }

  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal })

  onVehicleChange = ({ target }) => {
    const { updates } = this.state;
    this.setState({...this.state, updates: {...updates, [target.name]: target.value} });
  }
  
  onBusinessChange = ({ target }) => {
    const { updates } = this.state;
    const { value } = target;
    if (value) this.setState({...this.state, updates: {...updates, isBusiness: value === "true" }});
  }

  onDateChange = ({ target }) => {
    const { updates } = this.state;
    this.setState({...this.state, updates: {...updates, date: JSONtoDateObject(target.value)}})
  }

  submit = e => {
    e.preventDefault();
    const tripIds = this.props.selected.map(trip => trip._id);
    this.props.batchUpdateTrips(tripIds, this.state.updates)
  }
  
  delete = e => {
    e.preventDefault();
    const tripIds = this.props.selected.map(trip => trip._id);
    this.props.batchDeleteTrips(tripIds)
  }

  render() {
    const { vehicles } = this.props.vehicles;

    return (
      <div className="m10" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <form id="batch-update" onSubmit={this.submit} style={form}>
          <input className="input" onChange={this.onDateChange} name="date" type="date" />
          <input className="input" onChange={this.onVehicleChange} list="vehicle-list" name="vehicle" placeholder="Select Vehicle" />
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
        {this.state.showDeleteModal &&
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