import React, { Component } from 'react';
import Pane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip, updateTrip } from './../redux/actions/tripActions'


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
        
    }
  }

  openTripModal = () => this.setState({ isTripModalOpen: true });
  closeTripModal = () => this.setState({ isTripModalOpen: false });
  
  render(){
    const { trips } = this.props.trips;
    const { addTrip, deleteTrip } = this.props;
    return (
      <div id="dash">
        <Pane title={"Trips"} addChild={this.openTripModal}>
          {trips.map((trip) => <Trip key={trip._id} {...trip} delete={deleteTrip} update={updateTrip}/>)}
        </Pane>
        {this.state.isTripModalOpen && 
          <Modal title="New Trip" formName="trip" label="Add Trip" close={this.closeTripModal}>
            <TripForm onSubmit={addTrip} close={this.closeTripModal}/>
          </Modal>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips
})

const mapDispatchToProps = {getTrips, addTrip, deleteTrip, updateTrip}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);