import React, { Component } from 'react';
import TripPane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import Insights from './Insights';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip, selectTrip } from './../redux/actions/tripActions'
import { addVehicle } from './../redux/actions/vehicleActions';
import { checkAuth, logout } from './../redux/actions/userActions';
import LoggedRedirect from './LoggedRedirect';
import ContextPane from './ContextPane';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      isTripModalOpen: false
    }
  }
  
  // check authentication and pull user data from cache if state has been reset
  componentDidMount(){
    console.log("Dashboard mounted")
    if (!this.props.user.loggedIn) this.props.checkAuth();
  }

  toggleTripModal = () => this.setState({ isTripModalOpen: !this.state.isTripModalOpen });
  
  render(){
    const { trips, selected, totalMileage, businessMiles, businessTrips } = this.props.trips;
    const { authenticating, loggedIn, authFailed } = this.props.user;
    const insightsData = { totalTrips: trips.length, totalMileage, businessMiles, businessTrips };
    const { deleteTrip, selectTrip } = this.props;
    let name = this.props.user.name;
    if (name) name = name.match(/\w+\s?/)[0].trimEnd();

    console.log(selected)
    return (
      authFailed || !loggedIn 
      ? <LoggedRedirect 
        to={{
          pathname: "/login", 
          state: { redirect: true } 
        }} from="/"/> 
      : 
      <div className="dash">
        {authenticating ? <h1>Loading...</h1> :
        <React.Fragment>
          <Insights {...insightsData}/>
          <div style={{display: "flex"}}>
            <TripPane addChild={this.toggleTripModal}>
              {trips.map(trip => <Trip key={trip._id} 
                {...trip}
                selected={selected.find(sel => sel._id === trip._id) ? true : false}
                select={selectTrip}
                delete={deleteTrip} 
              />)}
            </TripPane>
            <ContextPane selected={selected} />
          </div>
        </React.Fragment>}   
        {this.state.isTripModalOpen && 
          <Modal title="New Trip" formName="trip" label="Add Trip" close={this.toggleTripModal}>
            <TripForm close={this.toggleTripModal}/>
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

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, selectTrip, addVehicle, checkAuth, logout}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);