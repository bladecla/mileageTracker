import axios from 'axios';
import { cleanTrips, success } from './../../helpers';
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
                    trips: cleanTrips(trips),
                    totalMileage: +totalMileage,
                    businessMiles: +businessMiles,
                    businessTrips: +businessTrips
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
                    trip: cleanTrips(trip),
                    totalMileage: +totalMileage,
                    businessMiles: +businessMiles,
                    businessTrips: +businessTrips
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
                    newTrip: cleanTrips(trip),
                    totalMileage: +totalMileage,
                    businessMiles: +businessMiles,
                    businessTrips: +businessTrips
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
                    _id,
                    totalMileage: +totalMileage,
                    businessMiles: +businessMiles,
                    businessTrips: +businessTrips
                }
            })
        }
    }, err => console.error(err))
}