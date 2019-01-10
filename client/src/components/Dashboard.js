import React, { Component } from 'react';
import TripPane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import Insights from './Insights';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip } from './../redux/actions/tripActions'
import { addVehicle } from './../redux/actions/vehicleActions';
import { checkAuth, logout } from './../redux/actions/userActions';
import LoggedRedirect from './LoggedRedirect';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isTripModalOpen: false,
      shouldRedirect: false
    }
  }
  
  // check authentication and pull user data from cache if state has been reset
  componentDidMount(){
    if (!this.props.user.loggedIn) this.props.checkAuth();
  }

  toggleTripModal = () => this.setState({ isTripModalOpen: !this.state.isTripModalOpen });
  
  signOut = () => {
    this.setState({ shouldRedirect: true })
    this.props.logout()
  }
  
  render(){
    const { trips, totalMileage, businessMiles, businessTrips } = this.props.trips;
    const { authenticating, loggedIn, authFailed } = this.props.user;
    const insightsData = { totalTrips: trips.length, totalMileage, businessMiles, businessTrips };
    const { vehicles } = this.props.vehicles;
    const { addTrip, deleteTrip, updateTrip, addVehicle } = this.props;
    let name = this.props.user.name;
    if (name) name = name.match(/\w+\s?/)[0].trimEnd();
    console.log(loggedIn, this.state.shouldRedirect)
    return (
      authFailed || (!loggedIn && this.state.shouldRedirect) 
      ? <LoggedRedirect 
        to={{
          pathname: "/login", 
          state: { redirect: true } 
        }}/> 
      : 
      <div id="dash">
        {authenticating ? <h1>Loading...</h1> :
        <React.Fragment>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h1 style={{color: "whitesmoke"}}>{"Welcome, " + (loggedIn ? name : "Guest") + "!" }</h1>
            <button className="submit" onClick={this.signOut}>Logout</button>
          </div>
          <Insights {...insightsData}/>
          <TripPane title="Trips" addChild={this.toggleTripModal}>
            {trips.map(trip => <Trip key={trip._id} 
              {...trip} 
              delete={deleteTrip} 
              update={updateTrip} 
              addVehicle={addVehicle} 
              vehicles={vehicles}
            />)}
          </TripPane>
        </React.Fragment>}   
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
  vehicles: state.vehicles,
  user: state.user
})

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, addVehicle, checkAuth, logout}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);