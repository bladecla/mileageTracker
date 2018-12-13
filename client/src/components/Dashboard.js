import React, { Component } from 'react';
import Pane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip } from './../redux/actions/tripActions'
import { addVehicle, getVehicles} from './../redux/actions/vehicleActions';
import Insights from './Insights';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = this.calculateInsights();
    
  }
  
  toggleTripModal = () => this.setState({ isTripModalOpen: !this.state.isTripModalOpen });
  calculateInsights = () => {
    let businessTrips = 0;
    let totalMileage = 0;
    const {trips} = this.props.trips;

    trips.forEach(trip => {
      if (trip.isBusiness) businessTrips++;
      totalMileage += trip.end - trip.start;
    })

    return {
      totalMileage,
      percentBusiness: (businessTrips / trips.length) * 100
    }
  }
  
  render(){
    const { trips } = this.props.trips;
    const { vehicles } = this.props.vehicles;
    const { addTrip, deleteTrip, updateTrip, addVehicle } = this.props;
    return (
      <div id="dash">
        <Insights {...this.state}/>
        <Pane title="Trips" addChild={this.toggleTripModal}>
          {trips.map((trip) => <Trip key={trip._id} {...trip} delete={deleteTrip} update={updateTrip} addVehicle={addVehicle} vehicles={vehicles}/>)}
        </Pane>
        {this.state.isTripModalOpen && 
          <Modal title="New Trip" formName="trip" label="Add Trip" close={this.toggleTripModal}>
            <TripForm onSubmit={addTrip} close={this.toggleTripModal} addVehicle={addVehicle} vehicles={vehicles}/>
          </Modal>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips,
  vehicles: state.vehicles
})

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, addVehicle, getVehicles}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);