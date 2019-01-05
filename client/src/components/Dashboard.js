import React, { Component } from 'react';
import TripPane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import Insights from './Insights';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip } from './../redux/actions/tripActions'
import { addVehicle } from './../redux/actions/vehicleActions';
import { login, logout } from './../redux/actions/userActions';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isTripModalOpen: false,
      isLoginModalOpen: false
    }
  }
  
  componentDidMount(){
   
  }

  toggleTripModal = () => this.setState({ isTripModalOpen: !this.state.isTripModalOpen });
  toggleLoginModal = () => this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  
  render(){
    const { trips, totalMileage, businessMiles, businessTrips } = this.props.trips;
    const { name, authenticating, loggedIn } = this.props.user
    const insightsData = { totalTrips: trips.length, totalMileage, businessMiles, businessTrips };
    const { vehicles } = this.props.vehicles;
    const { addTrip, deleteTrip, updateTrip, addVehicle, logout } = this.props;
    return (
      <div id="dash">
        {authenticating ? <h1>Loading...</h1> :
        <React.Fragment>
          <h1 style={{color: "whitesmoke"}}>{"Welcome, " + (loggedIn ? name : "Guest") + "!" }</h1>
          <button onClick={this.toggleLoginModal}>Login</button>
          <button onClick={logout}>Logout</button>
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
        </React.Fragment>
      }
        {this.state.isTripModalOpen && 
          <Modal title="New Trip" formName="trip" label="Add Trip" close={this.toggleTripModal}>
            <TripForm onSubmit={addTrip} close={this.toggleTripModal} addVehicle={addVehicle} vehicles={vehicles}/>
          </Modal>}
        {this.state.isLoginModalOpen && <LoginForm isRegister={false} close={this.toggleLoginModal}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips,
  vehicles: state.vehicles,
  user: state.user
})

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, addVehicle, login, logout}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);