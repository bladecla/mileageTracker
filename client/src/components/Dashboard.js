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
            isTripModalOpen: false,
            isDeleteModalOpen: false,
            shouldDelete: false
        }
    }

    openTripModal = () => this.setState({ isTripModalOpen: true });
    closeTripModal = () => this.setState({ isTripModalOpen: false });
    openDeleteModal = () => this.setState({ isDeleteModalOpen: true });
    closeDeleteModal = () => this.setState({ isDeleteModalOpen: false, shouldDelete: false });
    setDelete = () => {
        console.log("submit")
        this.setState({shouldDelete: true});
    }

    render(){
        const { trips } = this.props.trips;
        const { addTrip, deleteTrip } = this.props;
        return (
            <div className="dash">
                <Pane title={"Trips"} addChild={this.openTripModal}>
                    {trips.map((trip) => <Trip key={trip._id} {...trip} delete={deleteTrip} confirmDelete={this.openDeleteModal} close={this.closeDeleteModal} shouldDelete={this.state.shouldDelete} />)}
                </Pane>
                {this.state.isTripModalOpen && 
                <Modal title="Enter Trip Information" formName="trip" label="Add Trip" close={this.closeTripModal}>
                    <TripForm onSubmit={addTrip} close={this.closeTripModal}/>
                </Modal>}
                {this.state.isDeleteModalOpen && 
                <Modal title="Confirm Deletion" formName="delete" label="Delete This Trip" close={this.closeDeleteModal}>
                    <form id="delete" onSubmit={this.setDelete}>
                        <p style={{textAlign: "center"}}>Are you sure you want to delete this trip?</p>
                        <input type="hidden" name="a" value="b"/>
                    </form>
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