import axios from 'axios';
import { cleanTrips, cleanNumbers, success } from './../../helpers';
import { ADD_TRIP, SET_TRIPS, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from './types';
;

export const getTrips = () => dispatch => {
    axios
    .get('api/trips')
    .then(({data}) => {
        if(success(data.status, dispatch)){
            const {trips, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: SET_TRIPS,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trips: cleanTrips(trips)
                }
            })
        }
    }, err => console.error(err) )
}

export const addTrip = trip => dispatch => {
    axios
    .post('api/trips', trip)
    .then(({data}) => {
        if(success(data.status, dispatch)){
            const {trip, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: ADD_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    trip: cleanTrips(trip)
                }
            })
        }
    }, err => console.error(err) )
}

export const updateTrip = newTrip => dispatch => {
    axios
    .put('api/trips', newTrip)
    .then(({data}) => {
        if (success(data.status, dispatch)){
            const {trip, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: UPDATE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    newTrip: cleanTrips(trip)
                }
            })
        }    
    }, err => console.error(err))
}

export const deleteTrip = tripId => dispatch => {
    console.log(tripId)
    axios
    .delete('api/trips/' + tripId)
    .then(({data})=> {
        if (success(data.status)){
            const {_id, totalMileage, businessMiles, businessTrips} = data;
            dispatch({
                type: DELETE_TRIP,
                payload: {
                    ...cleanNumbers({ totalMileage, businessMiles, businessTrips }),
                    _id
                }
            })
        }
    }, err => console.error(err))
}