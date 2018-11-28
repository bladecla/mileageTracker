import React, { Component } from 'react';
import Pane from './Pane';
import Trip from './Trip';

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
                     date: new Date().toDateString()
                    }
                   ]
        }
    }
    addTrip = () => {
        let newTrip = prompt("New trip: ", "trip " + (this.state.trips.length + 1));
        if (newTrip) this.setState({
            trips: [...this.state.trips, newTrip]
        })
    }

    render(){
        return (
            <div className="dash">
                <Pane title={"Trips"} addChild={this.addTrip}>
                    {this.state.trips.map((trip, idx) => <Trip {...trip} key={idx} />)}
                </Pane>
            </div>
        );
    }
}

export default Dashboard;