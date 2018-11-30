import React, { Component } from 'react';
import Pane from './Pane';
import Trip from './Trip';
import Modal from './Modal';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: [
                {
                    start: 1000,
                    end: 1100,
                    forBusiness: false,
                    vehicle: "Nissan"
                }, 
                {
                    start: 1100,
                    end: 1170,
                    forBusiness: true,
                    date: new Date()
                }
            ],
            isModalOpen: false
        }
    }
    addTrip = () => {
        // let newTrip = prompt("New trip: ", "trip " + (this.state.trips.length + 1));
        // if (newTrip) this.setState({
        //     trips: [...this.state.trips, newTrip]
        // })
        this.setState({
            isModalOpen: true
        })
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    render(){
        return (
            <div className="dash">
                <Pane title={"Trips"} addChild={this.addTrip}>
                    {this.state.trips.map((trip, idx) => <Trip {...trip} key={idx} />)}
                </Pane>
                {this.state.isModalOpen && <Modal title="Enter Trip Data" close={this.closeModal}/>}
            </div>
        );
    }
}

export default Dashboard;