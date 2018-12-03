import React, { Component } from 'react';
import Pane from './Pane';
import Trip from './Trip';
import Modal from './Modal';
import TripForm from './TripForm';
import { connect } from 'react-redux';
import { addTrip, getTrips, deleteTrip } from './../redux/actions/tripActions'


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });
    

    render(){
        const { trips } = this.props.trips;
        const { addTrip, deleteTrip } = this.props;
        return (
            <div className="dash">
                <Pane title={"Trips"} addChild={this.openModal}>
                    {trips.map((trip, idx) => <Trip {...trip} delete={deleteTrip} key={idx} />)}
                </Pane>
                {this.state.isModalOpen && 
                <Modal title="Enter Trip Data" formName="trip" label="Add Trip" close={this.closeModal}>
                    <TripForm onSubmit={addTrip} close={this.closeModal}/>
                </Modal>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  trips: state.trips
})

const mapDispatchToProps = {
  getTrips, addTrip, deleteTrip
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);