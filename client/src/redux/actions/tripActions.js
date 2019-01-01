import axios from 'axios';
import { cleanTrips, success } from './../../helpers';
import { SET_TRIPS, GET_TRIPS, DELETE_TRIP, UPDATE_TRIP } from './types';
;

export const getTrips = () => {
    return {
        type: GET_TRIPS
    }
}

export const addTrip = trip => dispatch => {
    axios
    .post('api/trips', trip)
    .then(res => {
        if(success(res.data.status, dispatch)){
            const {trips, totalMileage, businessMiles, businessTrips} = res.data;
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

export const updateTrip = newTrip => dispatch => {
    axios
    .put('api/trips', newTrip)
    .then(res => {
        const {trip, totalMileage, businessMiles, businessTrips} = res.data;
        dispatch({
            type: UPDATE_TRIP,
            payload: {
                newTrip: cleanTrips([trip])[0],
                totalMileage: +totalMileage,
                businessMiles: +businessMiles,
                businessTrips: +businessTrips
            }
        })
    })
}

export const deleteTrip = tripId => dispatch => {
    console.log(tripId)
    axios
    .delete('api/trips/' + tripId)
    .then(res => {
        console.log(res.data)
        if (res.data.success){
            const {_id, totalMileage, businessMiles, businessTrips} = res.data;
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
    })
}