import React, { Component } from 'react';
import TripPane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import Insights from './Insights';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip } from './../redux/actions/tripActions'
import { addVehicle, getVehicles} from './../redux/actions/vehicleActions';
import { login } from './../redux/actions/userActions';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isTripModalOpen: false,
      isLoginModalOpen: false
    }
  }
  
  componentDidMount(){
    if (!this.props.user.loggedIn) this.props.login({
      email: "waluigi.numbah1@gmail.com",
      password: "wahhhhhhh!"
    })
  }

  toggleTripModal = () => this.setState({ isTripModalOpen: !this.state.isTripModalOpen });
  toggleLoginModal = () => this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  
  render(){
    const { trips, totalMileage, businessMiles, businessTrips } = this.props.trips;
    const { name, email, authenticating } = this.props.user
    const insightsData = { totalTrips: trips.length, totalMileage, businessMiles, businessTrips };
    const { vehicles } = this.props.vehicles;
    const { addTrip, deleteTrip, updateTrip, addVehicle } = this.props;
    return (
      <div id="dash">
        {authenticating ? <h1>Loading...</h1> :
        <React.Fragment>
          <h1>{"Welcome, " + name + "!" }</h1>
          <Insights {...insightsData}/>
          <TripPane id="trip-pane" title="Trips" addChild={this.toggleTripModal}>
            {trips.map((trip) => <Trip key={trip._id} 
            {...trip} 
            delete={deleteTrip} 
            update={updateTrip} 
            addVehicle={addVehicle} 
            vehicles={vehicles}/>)}
          </TripPane>
        </React.Fragment>
      }
        {this.state.isTripModalOpen && 
          <Modal title="New Trip" formName="trip" label="Add Trip" close={this.toggleTripModal}>
            <TripForm onSubmit={addTrip} close={this.toggleTripModal} addVehicle={addVehicle} vehicles={vehicles}/>
          </Modal>}
        {this.state.isLoginModalOpen && 
          <Modal title="Log In" formName="login" label="Log In" close={this.toggleLoginModal}>
            <LoginForm close={this.toggleLoginModal}/>
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

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, addVehicle, getVehicles, login}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);