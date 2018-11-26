import React, { Component } from 'react'
import Pane from './Pane';

export default class TripPane extends Component {
    constructor(props){
        super(props);
        this.state = {
            trips: ["trip 1", "trip 2"]
        }
    }
    addTrip = () => {
        let newTrip = prompt("New trip: ", "trip " + (this.state.trips.length + 1));
        this.setState({
            trips: [...this.state.trips, newTrip]
        })
    }

    render() {
        return (
        <Pane title={"Trips"} addChild={this.addTrip}>
            {this.state.trips.map((trip, idx) => <div key={idx}>{trip}</div>)}
        </Pane>
        )
    }
}
