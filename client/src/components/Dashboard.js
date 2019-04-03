import React, { Component } from 'react';
import TripPane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import Insights from './Insights';
import Header from './Header';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip, selectTrip, selectAll, batchSelectTrip } from './../redux/actions/tripActions'
import { addVehicle } from './../redux/actions/vehicleActions';
import { checkAuth, logout } from './../redux/actions/userActions';
import LoggedRedirect from './LoggedRedirect';
import ContextPane from './ContextPane';
import { processDate } from '../helpers';
import Day from './Day';
import Loading from './Loading';

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

  processTrips = () => {
    const { selected, trips } = this.props.trips,
          { selectTrip, deleteTrip, batchSelectTrip} = this.props;
    const processed = [];
    let lastTrips = [], lastDate;
    
    trips.sort((a,b) => b.date - a.date);
    for (let i = trips.length -1; i > -1; i--) {
      const trip = trips[i];
      let { date, _id } = trip;
      let currentDate = processDate(date);

      if (!lastDate) lastDate = currentDate;
      if(currentDate !== lastDate){
        processed.unshift(
          <Day date={lastDate} 
          trips={lastTrips} 
          selected={selected} 
          select={batchSelectTrip}
          key={lastDate + _id}
          />
        );
        lastDate = currentDate;
        lastTrips = [];
      }
      processed.unshift(
        <Trip key={_id} 
        {...trip}
        selected={selected.find(sel => sel._id === _id) ? true : false}
        select={selectTrip}
        delete={deleteTrip} 
        />
      );
      lastTrips.push(trip);
      if(i === 0){
        processed.unshift(
          <Day date={lastDate} 
          trips={lastTrips} 
          selected={selected} 
          select={batchSelectTrip}
          key={lastDate + _id}
          />
        );
      }
    }
    return processed;
  }
  
  render(){
    const { trips, selected, totalMileage, businessMiles, businessTrips } = this.props.trips;
    const { authenticating, loggedIn, authFailed } = this.props.user;
    const insightsData = { totalTrips: trips.length, totalMileage, businessMiles, businessTrips };
    const { selectAll } = this.props;
    const checked = (selected.length > 0 && selected.length === trips.length)
    let name = this.props.user.name;
    if (name) name = name.match(/\w+\s?/)[0].trimEnd();
    
    return (
      authenticating && !loggedIn ? <Loading/> :
      authFailed
      ? <LoggedRedirect 
      to={{
        pathname: "/login", 
        state: { redirect: true } 
      }} from="/dashboard"/> 
      : 
      <div>
        <div id="dash-bg"/>
        <Header/>
        <div className="dash" id="dashboard">
          <Insights {...insightsData}/>
          <div style={{display: "flex"}}>
            <TripPane addChild={this.toggleTripModal} selectAll={selectAll} checked={checked}>
              {this.processTrips()}
            </TripPane>
            <ContextPane selected={selected} selectAll={selectAll}/>
          </div>
          {this.state.isTripModalOpen && 
            <Modal title="New Trip" formName="trip" label="Add Trip" close={this.toggleTripModal}>
              <TripForm close={this.toggleTripModal}/>
            </Modal>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips,
  vehicles: state.vehicles,
  user: state.user
})

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip, selectTrip, addVehicle, checkAuth, logout, selectAll, batchSelectTrip}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);